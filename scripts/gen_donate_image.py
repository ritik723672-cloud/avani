import asyncio
import os
import base64
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")

async def main():
    api_key = os.getenv("EMERGENT_LLM_KEY")
    chat = LlmChat(api_key=api_key, session_id="avani-donate-art", system_message="You are a helpful AI assistant")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    msg = UserMessage(
        text=(
            "Create a premium 3D render illustration for a women's empowerment charity donation page: "
            "a realistic elegant hand dropping a shiny gold coin into the coin slot on top of a deep forest green "
            "donation box with a subtle gold heart emblem on its front, warm ivory cream studio background, "
            "soft cinematic lighting, gentle shadows, minimal composition with the hand coming from the top right, "
            "modern premium NGO campaign aesthetic, high detail, no text, no words, no letters"
        ),
    )
    text, images = await chat.send_message_multimodal_response(msg)
    if images:
        os.makedirs("/app/frontend/public/assets", exist_ok=True)
        image_bytes = base64.b64decode(images[0]["data"])
        with open("/app/frontend/public/assets/donate-coin.png", "wb") as f:
            f.write(image_bytes)
        print("SAVED", len(image_bytes))
    else:
        print("NO IMAGES", text[:200] if text else "")

asyncio.run(main())
