import { dictionary } from './dictionary.js';

const wordInput = document.getElementById('word'); 
const translateButton = document.getElementById('btn-traslate'); 
const resultDiv = document.querySelector('.result p'); 
const categoryButtons = document.querySelectorAll('.list-word input[type="radio"]'); 
const wordListContainer = document.querySelector('.container-list-word'); 
const englishInput = document.getElementById('new-word-english');
const spanishInput = document.getElementById('new-word-spanish');
const categoryRadios = document.querySelectorAll('input[name="category"]');
const addButton = document.getElementById('btn-add-word');
const addResult = document.getElementById('add-result');
const example= document.getElementById('new-word-example')




function addWord() {
    const englishWord = englishInput.value.trim();
    const spanishWord = spanishInput.value.trim();
    const exampleWord= example.value.trim();
    let selectedCategory = null;

    for (const radio of categoryRadios) {
        if (radio.checked) {
            selectedCategory = radio.value;
            break;
        }
    }

    if (!englishWord || !spanishWord || !selectedCategory ||!exampleWord) {
        addResult.textContent = 'Por favor, completa todos los campos y selecciona una categoría.';
        addResult.style.color = 'red';
        return;
    }

    const newWord = {
        english: englishWord,
        spanish: spanishWord,
        example:exampleWord
    };

    if (dictionary.categories[selectedCategory]) {
        dictionary.categories[selectedCategory].push(newWord);
        addResult.textContent = `Palabra "${englishWord}" añadida a la categoría "${selectedCategory}".`;
        addResult.style.color = 'green';
    } else {
        addResult.textContent = 'Categoría no válida.';
        addResult.style.color = 'red';
    }

    englishInput.value = '';
    spanishInput.value = '';
    categoryRadios.forEach(radio => (radio.checked = false)); 
}

addButton.addEventListener('click', addWord);



// Función para traducir palabras
function translateWord() {
    const word = wordInput.value.trim().toLowerCase(); 
    const isEnglish = document.getElementById('button-inglesh').checked; 

    if (!word) { 
        resultDiv.textContent = 'Por favor, ingresa una palabra.'; 
        return; 
    }

  
    for (const category in dictionary.categories) {
        for (const item of dictionary.categories[category]) {
            if ((isEnglish && item.english.toLowerCase() === word) ||
                (!isEnglish && item.spanish.toLowerCase() === word)) {
                resultDiv.textContent = `Traducción:  ${isEnglish ? item.spanish: item.english}`; 
                return; 
            }
        }
    }

    resultDiv.textContent = 'Palabra no encontrada.'; 
}

function showCategoryWords(categoryName) {
    const category = dictionary.categories[categoryName]; 

    if (!category) { 
        wordListContainer.innerHTML = '<p>Categoría no encontrada.</p>'; 
        return; 
    }

    wordListContainer.innerHTML = ''; 


    for (const word of category) {
        const listItem = document.createElement('p'); 
        listItem.textContent = ` ${word.english} -> ${word.spanish} (ejemplo: ${word.example})    `; 
        wordListContainer.appendChild(listItem); 
    }
}

translateButton.addEventListener('click', translateWord);

categoryButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const categoryId = event.target.id.replace('btn-', ''); 
        showCategoryWords(categoryId); 
    });
});