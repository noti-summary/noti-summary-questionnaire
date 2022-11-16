from fastapi import APIRouter, Body, WebSocket, WebSocketDisconnect
import uuid


class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[WebSocket, str] = {}

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[websocket] = str(uuid.uuid4())

    def disconnect(self, websocket: WebSocket):
        del self.active_connections[websocket]

    async def send_direct_message(self, type: str, message: str, websocket: WebSocket):
        await websocket.send_json({"type": type, "message": message})


manager = ConnectionManager()

login_router = APIRouter()


@login_router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket) -> None:
    await manager.connect(websocket)
    print(f'Active clients: {len(manager.active_connections)}')

    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_direct_message("token", manager.active_connections.get(websocket), websocket)
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)


@login_router.post("/{userId}")
async def login_to_web(userId: str, accessToken: str = Body()) -> bool:
    for ws, token in manager.active_connections.items():
        if token == accessToken:
            await manager.send_direct_message("login", f'{userId} logged in successfully', ws)
            return True

    return False
