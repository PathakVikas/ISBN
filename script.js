function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

document.getElementById('isbnForm').addEventListener('submit', function(event) {
    event.preventDefault();
    validateISBN();
});

document.getElementById('isbn').addEventListener('input', function() {
    validateISBN();
});

document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('isbn').value = '';
    document.getElementById('result').textContent = '';
    document.getElementById('loading').style.display = 'none';
    document.getElementById('search').disabled = true;
});

document.getElementById('search').addEventListener('click', function() {
    const isbnInput = document.getElementById('isbn').value;
    searchOnline(isbnInput);
});

document.getElementById('darkModeToggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.navbar').classList.toggle('dark-mode');
    document.querySelector('.topnav').classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    document.querySelectorAll('input[type="text"]').forEach(function(input) {
        input.classList.toggle('dark-mode');
    });
    document.querySelectorAll('button').forEach(function(button) {
        button.classList.toggle('dark-mode');
    });
});

function validateISBN() {
    const isbnInput = document.getElementById('isbn').value;
    const resultElement = document.getElementById('result');
    const loadingElement = document.getElementById('loading');
    const searchButton = document.getElementById('search');
    
    resultElement.textContent = '';
    searchButton.disabled = true;
    
    if (isbnInput === '') {
        loadingElement.style.display = 'none';
        return;
    }

    loadingElement.style.display = 'block';

    setTimeout(function() {
        const isbn = isbnInput.replace(/-/g, '');
        if (isbn.length !== 10 && isbn.length !== 13) {
            resultElement.textContent = 'Invalid ISBN. ISBN must be 10 or 13 digits long.';
            loadingElement.style.display = 'none';
            return;
        }

        let sum = 0;
        if (isbn.length === 10) {
            for (let i = 0; i < 9; i++) {
                sum += (10 - i) * parseInt(isbn.charAt(i));
            }
            let checksum = 11 - (sum % 11);
            if (checksum === 10) checksum = 'X';
            if (checksum === 11) checksum = '0';
            if (checksum.toString() === isbn.charAt(9)) {
                resultElement.textContent = 'Valid ISBN-10';
                searchButton.disabled = false;
            } else {
                resultElement.textContent = 'Invalid ISBN-10';
            }
        } else if (isbn.length === 13) {
            for (let i = 0; i < 12; i++) {
                sum += (i % 2 === 0 ? 1 : 3) * parseInt(isbn.charAt(i));
            }
            let checksum = 10 - (sum % 10);
            if (checksum === 10) checksum = '0';
            if (checksum.toString() === isbn.charAt(12)) {
                resultElement.textContent = 'Valid ISBN-13';
                searchButton.disabled = false;
            } else {
                resultElement.textContent = 'Invalid ISBN-13';
            }
        } else {
            resultElement.textContent = 'Invalid ISBN. ISBN must be 10 or 13 digits long.';
        }
        loadingElement.style.display = 'none';
    }, 500);
}

function searchOnline(isbn) {
    isbn = isbn.replace(/-/g, '');
    const url = `https://www.google.com/search?&tbm=bks&q=isbn:${isbn}`;
    window.open(url, '_blank');
}
