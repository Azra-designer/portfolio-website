// ===== ELEMENTS =====
const inpName       = document.getElementById('inp-name')
const inpAmount     = document.getElementById('inp-amount')
const inpType       = document.getElementById('inp-type')
const inpCategory   = document.getElementById('inp-category')
const addBtn        = document.getElementById('add-btn')
const tbody         = document.getElementById('tbody')
const filterSelect  = document.getElementById('filter-select')
const exportBtn     = document.getElementById('export-btn')
const errorMsg      = document.getElementById('error-msg')
const emptyState    = document.getElementById('empty-state')

const totalBalanceEl = document.getElementById('total-balance')
const totalIncomeEl  = document.getElementById('total-income')
const totalExpenseEl = document.getElementById('total-expense')

// ===== DATA =====
let transactions = []

// ===== ADD TRANSACTION =====
addBtn.addEventListener('click', function () {
    const name     = inpName.value.trim()
    const amount   = parseFloat(inpAmount.value)
    const type     = inpType.value
    const category = inpCategory.value

    // Validation
    if (!name)                        return showError('Transaction name likhao!')
    if (isNaN(amount) || amount <= 0) return showError('Valid amount daalo!')
    if (!type)                        return showError('Type select karo!')
    if (!category)                    return showError('Category select karo!')

    clearError()

    const transaction = {
        id:       Date.now(),
        name:     name,
        amount:   amount,
        type:     type,
        category: category
    }

    transactions.push(transaction)
    saveToStorage()
    renderAll()
    clearForm()
})

// ===== ENTER KEY =====
document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') addBtn.click()
})

// ===== FILTER =====
filterSelect.addEventListener('change', function () {
    renderTable()
})

// ===== EXPORT CSV =====
exportBtn.addEventListener('click', function () {
    if (transactions.length === 0) return showError('Koi transaction nahi hai!')

    const rows = [['Name', 'Category', 'Type', 'Amount']]
    transactions.forEach(function (t) {
        rows.push([t.name, t.category, t.type, t.amount])
    })

    const csv     = rows.map(r => r.join(',')).join('\n')
    const blob    = new Blob([csv], { type: 'text/csv' })
    const url     = URL.createObjectURL(blob)
    const a       = document.createElement('a')
    a.href        = url
    a.download    = 'expenseiq-transactions.csv'
    a.click()
    URL.revokeObjectURL(url)
})

// ===== RENDER ALL =====
function renderAll() {
    updateCards()
    renderTable()
}

// ===== UPDATE CARDS =====
function updateCards() {
    const income  = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)

    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)

    const balance = income - expense

    totalBalanceEl.innerText = formatCurrency(balance)
    totalIncomeEl.innerText  = formatCurrency(income)
    totalExpenseEl.innerText = formatCurrency(expense)

    // Balance color
    if (balance < 0) {
        totalBalanceEl.style.color = '#ef4444'
    } else {
        totalBalanceEl.style.color = '#f0f0f0'
    }
}

// ===== RENDER TABLE =====
function renderTable() {
    const filter    = filterSelect.value
    const filtered  = filter === 'all'
        ? transactions
        : transactions.filter(t => t.type === filter)

    // Reverse — latest first
    const reversed = [...filtered].reverse()

    if (reversed.length === 0) {
        tbody.innerHTML = ''
        emptyState.classList.add('show')
        return
    }

    emptyState.classList.remove('show')

    tbody.innerHTML = reversed.map(function (t) {
        return `
            <tr>
                <td>${t.name}</td>
                <td>${t.category}</td>
                <td>
                    <span class="badge badge-${t.type}">
                        ${t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                    </span>
                </td>
                <td class="amount-${t.type}">
                    ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
                </td>
                <td>
                    <button class="btn-delete" onclick="deleteTransaction(${t.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `
    }).join('')



    // Total row
const income  = filtered.reduce((s,t) => t.type==='income'  ? s+t.amount : s, 0)
const expense = filtered.reduce((s,t) => t.type==='expense' ? s+t.amount : s, 0)
const balance = income - expense

tbody.innerHTML += `
    <tr style="border-top: 2px solid #2a2a2a; font-weight:500;">
        <td colspan="3" style="color:#888; font-size:0.75rem; padding-top:1rem;">
            TOTAL
        </td>
        <td style="color:${balance >= 0 ? '#22c55e' : '#ef4444'}; padding-top:1rem;">
            ${balance >= 0 ? '+' : ''}${formatCurrency(balance)}
        </td>
        <td></td>
    </tr>
`
}

// ===== DELETE =====
function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id)
    saveToStorage()
    renderAll()
}

// ===== LOCALSTORAGE =====
function saveToStorage() {
    localStorage.setItem('expenseiq-data', JSON.stringify(transactions))
}

function loadFromStorage() {
    const saved = localStorage.getItem('expenseiq-data')
    if (saved) {
        transactions = JSON.parse(saved)
        renderAll()
    } else {
        emptyState.classList.add('show')
    }
}

// ===== HELPERS =====
function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    })
}

function showError(msg) {
    errorMsg.innerText = msg
    inpName.style.borderColor = '#ef4444'
    setTimeout(clearError, 3000)
}

function clearError() {
    errorMsg.innerText = ''
    inpName.style.borderColor = ''
}

function clearForm() {
    inpName.value     = ''
    inpAmount.value   = ''
    inpType.value     = ''
    inpCategory.value = ''
    inpName.focus()
}

// ===== INIT =====
loadFromStorage()








// Ye add kar sakte ho script mein
// document.querySelectorAll('.nav-item').forEach(item => {
//     item.addEventListener('click', function(e) {
//         e.preventDefault()
//         document.querySelectorAll('.nav-item')
//             .forEach(i => i.classList.remove('active'))
//         this.classList.add('active')
//     })
// })