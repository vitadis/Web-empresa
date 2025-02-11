// Función para agregar mensajes al chat
function addMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    
    // Si el mensaje contiene un enlace (para horarios), insertarlo como HTML
    if (typeof message === 'string') {
        messageElement.textContent = message;
    } else if (typeof message === 'object' && message.response) {
        messageElement.innerHTML = message.response;
        if (message.link) {
            const linkElement = document.createElement('a');
            linkElement.href = message.link;
            linkElement.textContent = "Click :)";
            linkElement.target = "_blank";  // Abrir en una nueva pestaña
            linkElement.style.display = 'block';  // Enlace debajo del texto
            linkElement.style.marginTop = '5px';
            messageElement.appendChild(linkElement);
        }
    }
    
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;  // Desplazarse hacia abajo
}

// Función para procesar el mensaje del usuario y buscar en JSON
function processUserMessage(userMessage, data) {
    let botResponse = { response: "Lo siento, no entiendo esa pregunta." };
    const cleanMessage = userMessage.trim().toLowerCase();

    // Condición especial para limpiar el chat si el usuario escribe 'clear'
    if (cleanMessage === 'clear') {
        clearChat();
        return { response: "Chat limpiado perro" };  // Mensaje de confirmación
    }

    // Buscar coincidencias en los saludos
    data.saludos.forEach(item => {
        item["keywords"].forEach(keyword => {
            if (cleanMessage.includes(keyword)) {
                botResponse = { response: item["response"] };
            }
        });
    });

    // Buscar coincidencias en preguntas frecuentes
    data.preguntas_frecuentes.forEach(item => {
        item["keywords"].forEach(keyword => {
            if (cleanMessage.includes(keyword)) {
                botResponse = {
                    response: item["response"],
                    link: item["link"] ? item["link"] : null //Este es nulo amenos que la keyword sea correcta
                };
            }
        });
    });

    // Buscar coincidencias en redes sociales
    data.redes_sociales.forEach(item => {
        item["keywords"].forEach(keyword => {
            if (cleanMessage.includes(keyword)) {
                botResponse = {
                    response: item["response"],
                    link: item["link_2"] ? item["link_2"] : null //Este es nulo amenos que la keyword sea correcta                    
                };
            }
        });
    });

    // Buscar coincidencias en despedidas
    data.despedidas.forEach(item => {
        item["keywords"].forEach(keyword => {
            if (cleanMessage.includes(keyword)) {
                botResponse = { response: item["response"] };
            }
        });
    });

    return botResponse;
}

// Función para limpiar el chat
function clearChat() {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = '';  // Limpia todo el contenido del chat
}

// Cargar el archivo JSON con fetch
fetch('atencion_cliente.json')
    .then(response => response.json())  // Convertir la respuesta a JSON
    .then(data => {
        const userInput = document.getElementById('user-input');
        const sendButton = document.getElementById('send-btn');
        
        function sendMessage() {
            const userMessage = userInput.value.trim();
            if (userMessage !== "") {
                addMessage(userMessage, 'user');
                const botResponse = processUserMessage(userMessage, data);
                setTimeout(() => addMessage(botResponse, 'bot'), 500);
                userInput.value = '';  // Limpiar campo de entrada
            }
        }
        
        sendButton.addEventListener('click', sendMessage);
        
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();  // Evita el comportamiento por defecto
                sendMessage();
            }
        });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));

    document.addEventListener("DOMContentLoaded", function () {
            const sendBtn = document.getElementById("send-btn");
            const userInput = document.getElementById("user-input");

            function sendMessage() {
                const userMessage = userInput.value.trim();
                if (userMessage !== "") {
                    addMessage(userMessage, "user");
                    userInput.value = "";

                    // Espera a que el JSON se cargue antes de procesar el mensaje
                    fetch('atencion_cliente.json')
                        .then(response => response.json())
                        .then(data => {
                            const botResponse = processUserMessage(userMessage, data);
                            setTimeout(() => {
                                addMessage(botResponse, "bot");
                            }, 500);
                        })
                        .catch(error => console.error("Error al cargar el archivo JSON:", error));
                }
            }

            sendBtn.addEventListener("click", sendMessage);

            userInput.addEventListener("keypress", function (event) {
                if (event.key === "Enter") {
                    event.preventDefault(); // Evita comportamiento inesperado
                    sendMessage();
                }
            });
        });