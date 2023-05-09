function chatsize() {
    // Opens and closes the chatbot window by changing CSS for the classes below
    let w = document.getElementsByClassName("chatArrow")[0]
    let x = document.getElementsByClassName("react-chatbot-kit-chat-message-container")[0]
    let y = document.getElementsByClassName("react-chatbot-kit-chat-input-container")[0]
    let z = document.getElementsByClassName("react-chatbot-kit-chat-inner-container")[0]
    console.log('opening/closing chatbot window')
    if (w.style.bottom === "18px") {
        w.style.bottom = "470px";
        w.style.transform = "rotate(0)";
    } else {
        w.style.bottom = "18px";
        w.style.transform = "rotate(180deg)"
    }
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    if (y.style.display === "none") {
        y.style.display = "flex";
    } else {
        y.style.display = "none";
    }
    if (z.style.height === "48px") {
        z.style.height = "500px";
    } else {
        z.style.height = "48px";
    }
    
} 

export default chatsize