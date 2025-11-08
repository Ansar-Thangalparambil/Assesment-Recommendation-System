from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import joblib

# --------------------------
# Load Assessment Catalogue
# --------------------------
assessments_df = pd.read_csv("assessments_catalogue.csv")

# Ensure a 'url' column exists
if "url" not in assessments_df.columns:
    raise ValueError("Catalogue file must contain a column named 'url'.")

# --------------------------
# Load ML Model Files
# --------------------------
vectorizer = joblib.load("vectorizer.pkl")
assessment_vectors = joblib.load("vectors.pkl")

# --------------------------
# FastAPI Setup
# --------------------------
app = FastAPI()

# Enable CORS so frontend can call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      
    allow_credentials=True,
    allow_methods=["*"],      
    allow_headers=["*"],      
)

# --------------------------
# Request Body Model
# --------------------------
class QueryModel(BaseModel):
    query: str

# --------------------------
# Health Check Endpoint
# --------------------------
@app.get("/health")
def health():
    return {"status": "ok"}

# --------------------------
# Recommendation Endpoint
# --------------------------
@app.post("/recommend")
def recommend(data: QueryModel):
    query_text = data.query

    # Convert user query to vector
    query_vec = vectorizer.transform([query_text])
    similarity_scores = cosine_similarity(query_vec, assessment_vectors).flatten()

    # Top 10 most similar assessments
    top_indices = similarity_scores.argsort()[-10:][::-1]

    results = []
    for idx in top_indices:
        results.append({
            "assessment_url": assessments_df.iloc[idx]["url"],
            "score": round(float(similarity_scores[idx]), 4)
        })

    return {"results": results}
