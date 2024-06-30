import os
import re
from tqdm import tqdm
import google.generativeai as genai
import hashlib

def cached_request(prompt, model_name="gemini-1.5-flash", cache_dir='/tmp'):
    ## import hashlib and get determinstic hash of prompt as prompt_id
    prompt_id = hashlib.md5(prompt.encode()).hexdigest()
    print(prompt[:40], prompt_id)
    if os.path.exists(f'{cache_dir}/{prompt_id}.txt'):
        with open(f'{cache_dir}/{prompt_id}.txt', 'r') as f:
            return f.read()
    else:
        raise Exception(f"No cached file found for {prompt_id}")
    genai.configure(api_key=os.environ["GEMINI_API_KEY"])
    generation_config = {
            "temperature": 1,
            "top_p": 0.95,
            "top_k": 64,
            "max_output_tokens": 1024,
            "response_mime_type": "text/plain",
        }
    model = genai.GenerativeModel(
        model_name=model_name,
        generation_config=generation_config,
    )

    chat_session = model.start_chat(history=[])

    response = chat_session.send_message(prompt)
    with open(f'{cache_dir}/{prompt_id}.txt', 'w') as f:
        f.write(response.text)
    return response.text
def get_summary_prompt(text, summary_description="100 word"):
    return f"Create a {summary_description} summary of the following document: {text}"
def deyappify(text, prompt, model_name="gemini-1.5-flash", generation_config=None):
    prompt = get_summary_prompt(text, summary_description="100 word")
    summary = cached_request(prompt, model_name=model_name)
    return summary

# Example usage
if __name__ == "__main__":
    sample_text = "INSERT_LONG_DOCUMENT_TEXT_HERE"
    summary = deyappify(sample_text)
    print(summary)
