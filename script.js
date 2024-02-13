
const chatInput = document.querySelector( ".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox= document.querySelector(".chatbox");
const chatbotToggler= document.querySelector(".chatbot-toggler");
const chatbotCloseBtn= document.querySelector(".close-btn");



let userMessage;
const API_KEY = "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";

const createChatLi = (message, className) => {
    
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className ===  "outgoing" ? `<div class="you">You<div><p>${message}</p>`: `<div><span><img src="Chat.png" alt="chat" style="height:24px; width:24px;" ></span><div>ChatBot</div></div><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}
const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages:[{role: "user", content: userMessage}]

        })
    }
    //Send Post request to API ,GET RESPONSE
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.textContent ="Oops! Something went wrong.Please try again";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
    
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatInput.value = "";


    //Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(100, chatbox.scrollHeight);

    setTimeout (() => {
        //Display "..." mesage while waiting for the response
        const incomingChatLi = createChatLi("...", "incoming")
          chatbox.appendChild(incomingChatLi);
          chatbox.scrollTo(0, chatbox.scrollHeight);
          generateResponse(incomingChatLi);
          
    }, 600);
}

chatInput.addEventListener("keyup",(e)  => {
    //Send if enter key is pressed
   if(e.key ==="Enter") {
    handleChat();
   }
});


sendChatBtn.addEventListener("click",handleChat);
sendChatBtn.addEventListener("keyup",handleChat);
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

