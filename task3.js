const quizQuestions = [
            {
            question: "Which is the powerhouse of the cell?",
            options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
            answer: 1
        },
        {
            question: "Variation does not occur in humans",
            options: ["True", "False", "Data insufficient", "None of these"],
            answer: 1
        },
        {
            question: "Which vitamin is produced in human skin by sunlight?",
            options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
            answer: 3
        },
        {
            question: "What is the main function of red blood cells?",
            options: ["Fight infections", "Carry oxygen", "Clot blood", "Produce hormones"],
            answer: 1
        },
        {
            question: "What is the chemical symbol for water?",
            options: ["O2", "H2O", "CO2", "NaCl"],
            answer: 1
        }
        ];

        function startQuiz() {
            const quizContainer = document.getElementById('quiz-container');
            quizContainer.innerHTML = '';
            quizQuestions.forEach((q, idx) => {
                const div = document.createElement('div');
                div.className = 'quiz-question';
                div.innerHTML = `<div><strong>${idx + 1}. ${q.question}</strong></div>`;
                const optionsDiv = document.createElement('div');
                optionsDiv.className = 'quiz-options';
                q.options.forEach((opt, optIdx) => {
                    optionsDiv.innerHTML += `
                        <label>
                            <input type="radio" name="q${idx}" value="${optIdx}">
                            ${opt}
                        </label>
                    `;
                });
                div.appendChild(optionsDiv);
                quizContainer.appendChild(div);
            });
        }

        document.getElementById('submit-button').onclick = function() {
            let score = 0;
            quizQuestions.forEach((q, idx) => {
                const radios = document.getElementsByName('q' + idx);
                let selected = -1;
                radios.forEach(r => { if (r.checked) selected = parseInt(r.value); });
                if (selected === q.answer) score++;
            });
            document.getElementById('results-container').textContent =
                `You scored ${score} out of ${quizQuestions.length}!`;
        };

        // --- Weather API ---
        function fetchWeatherData() {
            // Open-Meteo API (no key needed, demo for Mumbai)
            fetch('https://api.open-meteo.com/v1/forecast?latitude=22.5726&longitude=88.3639&current_weather=true')
                .then(res => res.json())
                .then(data => {
                    const weather = data.current_weather;
                    document.getElementById('weather-data').innerHTML =
                        `<strong>Kolkata Weather:</strong><br>
                        Temperature: ${weather.temperature}°C<br>
                        Windspeed: ${weather.windspeed} km/h<br>
                        Weather Code: ${weather.weathercode}`;
                })
                .catch(() => {
                    document.getElementById('weather-data').textContent = "Unable to fetch weather data.";
                });
        }

        // --- Initialize ---
        startQuiz();
        fetchWeatherData();