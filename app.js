// Navigation Control
function showSection(sectionId) {
    // Hide all sections with animation reset
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    
    // Display target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        // Force reflow to restart transition
        targetSection.offsetHeight;
        targetSection.classList.add('active');
    }
    
    // Manage Sidebar active state
    document.querySelectorAll('nav li').forEach(li => {
        li.classList.remove('active');
    });
    
    const activeNav = document.getElementById(`nav-${sectionId}`);
    if (activeNav) {
        activeNav.classList.add('active');
    }
    
    // Set Header Breadcrumb and Section Title
    let displayTitle = '회사 개요';
    switch (sectionId) {
        case 'company-intro':
            displayTitle = '회사 개요';
            // Trigger Counter Animation again when entering intro
            initCounters();
            break;
        case 'materials-gold':
            displayTitle = '원자재 > 금 (Gold)';
            break;
        case 'materials-aluminum':
            displayTitle = '원자재 > 알루미늄 (Aluminum)';
            break;
        case 'materials-copper':
            displayTitle = '원자재 > 구리 (Copper)';
            break;
        case 'materials-coal':
            displayTitle = '원자재 > 석탄 (Coal)';
            break;
        case 'automotive':
            displayTitle = '모빌리티 > 자동차 쇼케이스';
            break;
        case 'contact':
            displayTitle = '파트너십 > 협력 문의';
            break;
    }
    document.getElementById('current-page-title').innerText = displayTitle;
    
    // Scroll content container back to top
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
        scrollContainer.scrollTop = 0;
    }
}

// Live Commodity Ticker Simulator (WOW Factor)
const tickerData = {
    gold: { price: 2410.50, change: 1.24 },
    al: { price: 2530.00, change: -0.45 },
    copper: { price: 9280.00, change: 0.85 },
    coal: { price: 142.20, change: -1.15 }
};

function updateTickerWidgets() {
    setInterval(() => {
        // Randomly update values
        for (let commodity in tickerData) {
            const current = tickerData[commodity];
            const changePercent = (Math.random() * 0.4 - 0.2); // -0.2% ~ +0.2%
            current.price += current.price * (changePercent / 100);
            current.change += changePercent;
            
            // Format output strings
            const priceStr = commodity === 'coal' || commodity === 'gold' 
                ? `$${current.price.toFixed(2)}` 
                : `$${Math.round(current.price).toLocaleString()}`;
                
            const changeSign = current.change >= 0 ? '+' : '';
            const changeStr = `${changeSign}${current.change.toFixed(2)}%`;
            
            // Update widget UI
            if (commodity === 'gold') {
                const el = document.getElementById('ticker-gold');
                if (el) {
                    el.querySelector('.value').innerText = priceStr;
                    const changeEl = el.querySelector('.change');
                    changeEl.innerText = changeStr;
                    changeEl.className = `change ${current.change >= 0 ? 'positive' : 'negative'}`;
                }
            } else if (commodity === 'al') {
                const el = document.getElementById('ticker-al');
                if (el) {
                    el.querySelector('.value').innerText = priceStr;
                    const changeEl = el.querySelector('.change');
                    changeEl.innerText = changeStr;
                    changeEl.className = `change ${current.change >= 0 ? 'positive' : 'negative'}`;
                }
            }
        }
    }, 4000);
}

// Number Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-val');
    counters.forEach(counter => {
        const targetStr = counter.getAttribute('data-target');
        const hasTextPlus = targetStr.includes('+');
        const hasTextTon = targetStr.includes('톤+');
        const hasTextGae = targetStr.includes('개국');
        const hasTextPercent = targetStr.includes('%');
        
        let target = parseFloat(targetStr);
        if (isNaN(target)) target = 0;
        
        let start = 0;
        const duration = 1200; // ms
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = target / steps;
        
        let currentStep = 0;
        
        const timer = setInterval(() => {
            currentStep++;
            start += increment;
            
            if (currentStep >= steps) {
                counter.innerText = targetStr; // Ensure exact final value is printed
                clearInterval(timer);
            } else {
                let displayVal = '';
                if (hasTextPlus && !hasTextTon) {
                    displayVal = `${start.toFixed(1)}B+`;
                } else if (hasTextTon) {
                    displayVal = `${Math.round(start).toLocaleString()}톤+`;
                } else if (hasTextGae) {
                    displayVal = `${Math.round(start)}개국`;
                } else if (hasTextPercent) {
                    displayVal = `${start.toFixed(1)}%`;
                } else {
                    displayVal = start.toFixed(1);
                }
                counter.innerText = displayVal;
            }
        }, stepTime);
    });
}

// Interactive Contact Form Handler
function handleContactSubmit(event) {
    event.preventDefault();
    
    // Simulate API request delay
    const submitBtn = document.querySelector('.submit-btn');
    const originalContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> 전송 중...';
    
    setTimeout(() => {
        // Show success modal
        document.getElementById('success-modal').style.display = 'flex';
        
        // Reset button and form
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
        document.getElementById('peito-contact-form').reset();
    }, 1500);
}

function closeSuccessModal() {
    document.getElementById('success-modal').style.display = 'none';
    showSection('company-intro');
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Start Live Price Ticker
    updateTickerWidgets();
    
    // Trigger statistics counters
    initCounters();
});
