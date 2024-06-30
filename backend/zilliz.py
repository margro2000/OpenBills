import json
import openai
from pymilvus import connections, Collection, FieldSchema, CollectionSchema, DataType
import numpy as np
from pydantic import BaseModel
import re
from parser import parse_data

# Set up OpenAI API key
openai.api_key = ""
zilliz_token = ""
zilliz_host = ""


def read_statute_json(file_path):
    with open(file_path, "r") as file:
        data = json.load(file)

    section_text = data.get("section_text")
    statute_metadata = data.get("statute_metadata")

    return section_text, statute_metadata


def generate_embedding(text):
    client = openai.OpenAI()

    response = client.embeddings.create(
        input="Your text string goes here", model="text-embedding-3-small"
    )
    return response.data[0].embedding


def upsert_statute(file_path):
    # Read the statute data
    chunk_list = parse_data(file_path)

    for chunk in chunk_list:
        section_text = chunk.get("statute_text")
        statute_metadata = chunk.get("statute_metadata")

        # Generate embedding for the section text
        embedding = generate_embedding(section_text)

        # Connect to Milvus
        connections.connect(
            alias="default",
            host="in03-cf74f3e9b2b99ae.api.gcp-us-west1.zillizcloud.com",
            port="443",  # Add this line for HTTPS port
            secure=True,  # Add this line to use HTTPS
            token=zilliz_token,
        )

        # Define the collection schema
        fields = [
            FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=True),
            FieldSchema(
                name="embedding", dtype=DataType.FLOAT_VECTOR, dim=1536
            ),  # Dimension for text-embedding-ada-002
            FieldSchema(name="section_text", dtype=DataType.VARCHAR, max_length=65535),
            FieldSchema(name="metadata", dtype=DataType.JSON),
        ]
        schema = CollectionSchema(fields, "Statute collection")

        # Create or get the collection
        collection_name = f"statutes_{file_path}"

        collection = Collection(collection_name, schema)
        collection.create_index(
            field_name="embedding",
            index_params={
                "index_type": "IVF_FLAT",
                "metric_type": "L2",
                "params": {"nlist": 1024},
            },
        )

        # Insert the data
        data = [[embedding], [section_text], [json.dumps(statute_metadata)]]

        collection.insert(data)

    # Flush the data to ensure it's persisted
    collection.flush()

    print(f"Upserted statute from {file_path}")

    # Disconnect from Milvus
    connections.disconnect("default")


def query_and_format_results(user_query, collection_name="statutes"):
    # Generate embedding for the user query
    query_embedding = generate_embedding(user_query)

    # Connect to Milvus
    connections.connect(
        alias="default",
        host="in03-cf74f3e9b2b99ae.api.gcp-us-west1.zillizcloud.com",
        port="443",  # Add this line for HTTPS port
        secure=True,  # Add this line to use HTTPS
        token=zilliz_token,
    )

    # Get the collection
    collection = Collection(collection_name)
    collection.load()

    # Search the collection
    search_params = {
        "metric_type": "L2",
        "params": {"nprobe": 10},
    }
    results = collection.search(
        data=[query_embedding],
        anns_field="embedding",
        param=search_params,
        limit=5,
        output_fields=["section_text", "metadata"],
    )

    # Format the results into a prompt
    prompt = f"User Query: {user_query}\n\nRelevant Statutes:\n\n"

    for i, hit in enumerate(results[0]):
        section_text = hit.entity.get("section_text")
        metadata = json.loads(hit.entity.get("metadata"))

        prompt += f"Statute {i+1}:\n"
        prompt += f"Text: {section_text}\n"
        prompt += f"Metadata: {metadata}\n\n"

    prompt += "Based on these statutes, please provide a response to the user's query."

    # Disconnect from Milvus
    connections.disconnect("default")

    return prompt


if __name__ == "__main__":
    # Upsert the statutes

    # Query the statutes
    user_query = "What is the penalty for not having health insurance?"
    prompt = query_and_format_results(user_query)
    print(prompt)
