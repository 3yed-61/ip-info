// Replace 'YOUR_API_KEY' with your actual API key
const apiKey = 'b9527c878f9440a3a54be261f60c4901';
const apiUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`;

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

async function fetchIPInfo() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Error fetching data.');
        }

        const data = await response.json();
        updateUIWithData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('loadingMessage').style.display = 'block';
        document.getElementById('loadingMessage').textContent = 'An error occurred while fetching the IP geolocation information.';
    }
}

function updateUIWithData(data) {
    document.getElementById('ipAddress').textContent = data.ip;
    document.getElementById('countryFlag').src = data.country_flag;
    document.getElementById('country').textContent = data.country_name;
    document.getElementById('stateProv').textContent = data.state_prov;
    document.getElementById('city').textContent = data.city;
    document.getElementById('zipcode').textContent = data.zipcode;
    document.getElementById('callingCode').textContent = data.calling_code;
    document.getElementById('countryCode2').textContent = data.country_code2;
    document.getElementById('isp').textContent = data.isp;
    document.getElementById('organization').textContent = data.organization;
    document.getElementById('timeZone').textContent = data.time_zone.name + ' (UTC' + data.time_zone.offset + ')';

    const infoContainer = document.getElementById('info-container');
    infoContainer.style.display = 'block';

    const getIPInfoBtn = document.getElementById('getIPInfoBtn');
    getIPInfoBtn.style.display = 'none';
}

document.getElementById('getIPInfoBtn').addEventListener('click', fetchIPInfo);

document.getElementById('copyIPAddressBtn').addEventListener('click', () => {
    const ipAddressElement = document.getElementById('ipAddress');
    if (ipAddressElement) {
        const ipAddress = ipAddressElement.textContent;
        if (ipAddress) {
            copyToClipboard(ipAddress);
            alert('IP address copied to clipboard.');
        }
    }
});
