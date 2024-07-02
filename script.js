// Replace with your Google Spreadsheet ID and Sheet name
const SPREADSHEET_ID = '1F96XFKo85Sq_kquweKDexLrLBXNjjrtJHXNk1n5O2k4';
const SHEET_NAME = 'Sheet1';

function submitFormData(event, type) {
    event.preventDefault();

    const form = event.target;
    const registerNumber = form.registerNumber.value;
    const currentTime = new Date().toLocaleString();

    const formData = {
        registerNumber,
        time: currentTime,
        type
    };

    writeToGoogleSheet(formData);
    showSuccessMessage(currentTime);
    form.reset();
}

function showSuccessMessage(time) {
    const successMessage = document.getElementById('successMessage');
    const timeMessage = document.getElementById('timeMessage');

    successMessage.classList.remove('hidden');
    timeMessage.textContent = `Entry Time: ${time}`;

    setTimeout(() => {
        successMessage.classList.add('hidden');
        window.location.reload();
    }, 1000);
}


async function writeToGoogleSheet(formData) {
    const url = `https://script.google.com/macros/s/AKfycbyO51m4qGGoQen1PBB5bBp5Vyj2mv5wtyoP9kQZ6EKNC7emHI0lpJ0x4rcwl02UMEU/exec`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `id=${SPREADSHEET_ID}&sheet=${SHEET_NAME}&data=${JSON.stringify(formData)}`
        });
        console.log('Data sent to Google Sheet successfully!', response);
    } catch (error) {
        console.error('Error sending data to Google Sheet:', error);
    }
}
