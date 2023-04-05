import sys
import json
from pymongo import MongoClient
from bson.objectid import ObjectId
from json import JSONEncoder
from datetime import datetime


class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super(CustomJSONEncoder, self).default(obj)

def get_jobs_from_mongodb():
    # Replace these with your MongoDB connection details
    MONGO_URI = ""
    DATABASE_NAME = "test"
    COLLECTION_NAME = "jobs"

    client = MongoClient(MONGO_URI)
    db = client[DATABASE_NAME]
    jobs_collection = db[COLLECTION_NAME]

    jobs = list(jobs_collection.find({}))
    return jobs

def main():
    # Get jobs from MongoDB
    all_jobs = get_jobs_from_mongodb()

    # Send the list of all jobs to Node.js
    print(json.dumps(all_jobs, cls=CustomJSONEncoder))

if __name__ == "__main__":
    main()