from fastapi import APIRouter, HTTPException, Query
from typing import List
from io import StringIO
from fastapi.responses import StreamingResponse
import csv
from app.models.feed import FeedRequest, ActualFeedRequest
from app.services import feed_service
from app.configs.redis_client import redis_client

feed_router = APIRouter()


@feed_router.get("/feed")
async def get_feed():
    try:
        return feed_service.get_feed()
    except Exception as e:
        return {"error": str(e)}, 500


@feed_router.post("/feed")
async def feed(payload: FeedRequest):
    """Process and feed the request data."""
    try:
        return feed_service.feed(payload.left_over)
    except Exception as e:
        return {"error": str(e)}, 400


@feed_router.put("/actual_feed")
async def update_actual_feed(payload: ActualFeedRequest):
    """Update the actual feed value in Redis."""
    try:
        redis_client.set("process:actual_feed", payload.actual_feed)
        return {"status": "updated"}, 200
    except Exception as e:
        return {"error": str(e)}, 400


@feed_router.get("/feed/export")
async def export_feed_sessions(include_all: bool = Query(True, alias="include_all")):

    feed_sessions_data = feed_service.export_feed_session(include_all)

    if not feed_sessions_data:
        raise HTTPException(status_code=404, detail="No data found")

    # Create a CSV from the list of dictionaries
    output = StringIO()
    writer = csv.DictWriter(output, fieldnames=feed_sessions_data[0].keys())
    writer.writeheader()
    writer.writerows(feed_sessions_data)
    output.seek(0)

    # Return the CSV file as a downloadable response
    return StreamingResponse(
        output,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment;filename=feed_sessions.csv"},
    )
