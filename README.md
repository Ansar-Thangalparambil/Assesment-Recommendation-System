project:
  name: "SHL Assessment Recommendation System"
  description: >
    A GenAI-powered recommendation engine that suggests the most relevant SHL individual
    assessments based on natural language job descriptions or queries. The system helps
    hiring managers find suitable SHL assessments instantly.

features:
  - Accepts natural language job descriptions or skill-based queries
  - Recommends top 5–10 relevant SHL individual assessments
  - Provides assessment name, SHL catalog URL, and similarity score
  - Balances recommendations across technical and behavioral categories
  - REST API built with FastAPI
  - Simple frontend using HTML, CSS, JavaScript
  - Meets all SHL problem requirements

workflow:
  data_preparation:
    - Crawl SHL product catalog
    - Clean data and extract individual test solutions
    - Remove pre-packaged job solutions
    - Store datasets in CSV format

  model_pipeline:
    vectorization: "TF-IDF Vectorizer"
    similarity_metric: "Cosine Similarity"
    saved_files:
      - vectorizer.pkl
      - vectors.pkl

  query_process:
    - Convert query to TF-IDF vector
    - Compute similarity scores with catalog vectors
    - Select top 10 assessments
    - Return structured JSON response

tech_stack:
  backend: FastAPI
  machine_learning: Scikit-learn (TF-IDF, cosine similarity)
  frontend: [HTML, CSS, JavaScript]
  storage: CSV
  deployment: ["Render", "Railway", "Vercel (optional)"]

api:
  base_url: "http://127.0.0.1:8000"
  endpoints:
    - route: "/health"
      method: GET
      description: "Check API status"
      sample_response:
        status: "ok"

    - route: "/recommend"
      method: POST
      description: "Get SHL assessment recommendations"
      request_body:
        query: "Looking for a Java developer who collaborates well"
      sample_response:
        results:
          - assessment_url: "https://www.shl.com/.../java-8-new/"
            score: 0.8703

frontend:
  files:
    - index.html
    - script.js
    - style.css
  features:
    - Input form for query
    - Results table display
    - Clean layout
    - Basic interactive UI

repo_structure:
  - backend/
  - frontend/
  - assessments_catalogue.csv
  - SHL_Recommendations.csv
  - recommendation_engine.ipynb
  - README.md
  - .gitignore

evaluation:
  performance_iterations:
    - version: "V1"
      technique: "Keyword Search"
      recall10: "Low"
      status: "Rejected"

    - version: "V2"
      technique: "TF-IDF + Cosine Similarity"
      recall10: "Improved"
      status: "Accepted"

    - version: "V3"
      technique: "Cleaned catalog + noise removal"
      recall10: "Best"
      status: "Final Model"

installation:
  steps:
    - "git clone https://github.com/Ansar-Thangalparambil/Assessment-Recommendation-System.git"
    - "cd Assessment-Recommendation-System"
    - "pip install -r requirements.txt"
    - "cd backend && uvicorn api:app --reload"
    - "cd frontend && python -m http.server 5500"
  access_url: "http://127.0.0.1:5500"


author:
  name: "Ansar Thangalparambil"
  role: "GenAI Developer & ML Enthusiast"
