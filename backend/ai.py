import os
from anthropic import Anthropic, HUMAN_PROMPT, AI_PROMPT
from yap import YAP

def deyappify(text, model = "claude-3-5-sonnet-20240620", testing=True):
    if testing:
        return text[:500]
    client = Anthropic()
    
    

    chunks = [
        text.split('[[Page 124 STAT. 512]]')
    ]
    summaries = []
    for i, chunk in enumerate(chunks):
        prompt = f"Please summarize the following chunk of a larger document. This is chunk {i} of {len(chunks)}\n\n{chunk}."
        chunk_id = hash(chunk)
        # if chunk_id file exists, read it and append to summaries
        if os.path.exists(f'/tmp/{chunk_id}.txt'):
            with open(f'/tmp/{chunk_id}.txt', 'r') as f:
                summaries.append(f.read())
            continue
        message = client.messages.create(
            model=model,
            max_tokens=1024,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        with open(f'/tmp/{chunk_id}.txt', 'w') as f:
            f.write(prompt)
        summaries.append(message.content[0].text)
    
    return "\n\n".join(summaries)

# Example usage
if __name__ == "__main__":
    sample_text = YAP
    summary = deyappify(sample_text)
    print(summary)