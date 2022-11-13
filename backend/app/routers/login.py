from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import uuid


class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[WebSocket, str] = {}

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[websocket] = str(uuid.uuid4())

    def disconnect(self, websocket: WebSocket):
        del self.active_connections[websocket]

    async def send_direct_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for ws in self.active_connections.keys():
            await ws.send_text(message)


manager = ConnectionManager()

login_router = APIRouter()


@login_router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket) -> None:
    await manager.connect(websocket)
    print(f'Active clients: {len(manager.active_connections)}')

    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_direct_message(manager.active_connections.get(websocket), websocket)
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)


@login_router.post("/{userId}/{access_token}")
async def login_to_web(userId: str, access_token: str) -> bool:
    for ws, token in manager.active_connections.items():
        if token == access_token:
            await manager.send_direct_message(f'{userId} logged in successfully', ws)
            return True

    return False
