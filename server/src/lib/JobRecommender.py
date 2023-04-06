import sys
import json
from pymongo import MongoClient
from bson.objectid import ObjectId
from json import JSONEncoder
from datetime import datetime
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super(CustomJSONEncoder, self).default(obj)

def get_jobs_from_mongodb():
    # Replace these with your MongoDB connection details
    MONGO_URI = "mongodb+srv://sebastien:a7esABl85LJKczXx@cluster0.w5se3db.mongodb.net/?retryWrites=true&w=majority"
    DATABASE_NAME = "test"
    COLLECTION_NAME = "jobs"

    client = MongoClient(MONGO_URI)
    db = client[DATABASE_NAME]
    jobs_collection = db[COLLECTION_NAME]

    jobs = list(jobs_collection.find({}))
    return jobs

def recommend_similar_jobs(job_offers, opened_job_id, num_recommendations=2):
    # Create a combined text attribute from the title and company
    for job in job_offers:
        job["combined_text"] = f"{job['title']} {job['company']}"

    # Extract the combined text for each job offer
    combined_text = [job["combined_text"] for job in job_offers]

    # Calculate the TF-IDF matrix
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(combined_text)

    # Compute the cosine similarity matrix
    cosine_sim = cosine_similarity(tfidf_matrix)

    # Get the index of the opened job offer in the job_offers list
    opened_job_index = [i for i, job in enumerate(job_offers) if str(job["_id"]) == opened_job_id][0]

    # Get the cosine similarity scores for the opened job offer
    sim_scores = list(enumerate(cosine_sim[opened_job_index]))

    # Sort the job offers by their similarity scores in descending order
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get the indices of the most similar job offers
    most_similar_indices = [i for i, _ in sim_scores[1:num_recommendations+1]]

    # Get the IDs of the most similar job offers
    recommended_job_ids = [str(job_offers[i]["_id"]) for i in most_similar_indices]

    return recommended_job_ids

def main():
    # Get jobs from MongoDB
    all_jobs = get_jobs_from_mongodb()

    # Example opened_job_id
    opened_job_id = "642dc2bfa3f449a23c559901"

    # Get recommended job IDs
    recommended_job_ids = recommend_similar_jobs(all_jobs, opened_job_id)
    

    # Print the recommended job IDs as JSON
    print(json.dumps(recommended_job_ids))

if __name__ == "__main__":
    main()