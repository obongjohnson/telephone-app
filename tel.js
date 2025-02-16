// Observer Class
class Observer {
    constructor(name) {
        this.name = name;
    }

    notify(phoneNumber) {
        const log = document.getElementById("callLog");
        log.innerHTML += `<p>${this.name}: ${phoneNumber}</p>`;
    }
}

// Telephone Class
class Telephone {
    constructor() {
        this.phoneNumbers = new Set();
        this.observers = new Set();
    }

    // Add a phone number
    AddPhoneNumber(phoneNumber) {
        if (!phoneNumber.trim()) return;
        this.phoneNumbers.add(phoneNumber);
        this.updatePhoneList();
    }

    // Remove a phone number
    RemovePhoneNumber(phoneNumber) {
        this.phoneNumbers.delete(phoneNumber);
        this.updatePhoneList();
    }

    // Dial a phone number
    DialPhoneNumber(phoneNumber) {
        if (this.phoneNumbers.has(phoneNumber)) {
            this.notifyObservers(phoneNumber);
        } else {
            alert(`Phone number ${phoneNumber} not found.`);
        }
    }

    // Add observer
    AddObserver(observer) {
        this.observers.add(observer);
    }

    // Notify observers
    notifyObservers(phoneNumber) {
        this.observers.forEach(observer => observer.notify(phoneNumber));
    }

    // Update UI list of saved numbers
    updatePhoneList() {
        const phoneList = document.getElementById("phoneList");
        phoneList.innerHTML = "";
        this.phoneNumbers.forEach(num => {
            phoneList.innerHTML += `<li>${num}</li>`;
        });
    }
}

// Initialize Telephone instance
const telephone = new Telephone();

// Create and add observers
const observer1 = new Observer("Observer 1");
const observer2 = new Observer("Now Dialling");
observer2.notify = function (phoneNumber) {
    const log = document.getElementById("callLog");
    log.innerHTML += `<p>Now Dialling ${phoneNumber}</p>`;
};

telephone.AddObserver(observer1);
telephone.AddObserver(observer2);

// Helper functions for UI interactions
function addPhone() {
    const phoneNumber = document.getElementById("phoneNumber").value;
    telephone.AddPhoneNumber(phoneNumber);
    document.getElementById("phoneNumber").value = "";
}

function removePhone() {
    const phoneNumber = document.getElementById("phoneNumber").value;
    telephone.RemovePhoneNumber(phoneNumber);
    document.getElementById("phoneNumber").value = "";
}

function dialPhone() {
    const phoneNumber = document.getElementById("phoneNumber").value;
    telephone.DialPhoneNumber(phoneNumber);
    document.getElementById("phoneNumber").value = "";
}