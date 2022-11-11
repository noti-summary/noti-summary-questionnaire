from fastapi import FastAPI
import uvicorn

from routers.summary import summary_router


app = FastAPI()
app.include_router(summary_router, prefix="/summary")

if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)