const SAMPLE_EMPLOYEES = [
  {
    employeeId: 'DMK-101',
    fullName: 'Jane Njeri',
    email: 'jane.njeri@company.com',
    phone: '+254 712 345 678',
    department: 'Finance',
    jobTitle: 'Accounts Officer',
    dateHired: '2020-04-12',
    status: 'Active'
  },
  {
    employeeId: 'DMK-104',
    fullName: 'David Kariuki',
    email: 'david.kariuki@company.com',
    phone: '+254 723 458 100',
    department: 'Production',
    jobTitle: 'Shift Supervisor',
    dateHired: '2018-09-07',
    status: 'Active'
  },
  {
    employeeId: 'DMK-117',
    fullName: 'Patricia Akinyi',
    email: 'patricia.akinyi@company.com',
    phone: '+254 733 761 900',
    department: 'Human Resources',
    jobTitle: 'HR Assistant',
    dateHired: '2021-03-16',
    status: 'On Leave'
  },
  {
    employeeId: 'DMK-126',
    fullName: 'Michael Otieno',
    email: 'michael.otieno@company.com',
    phone: '+254 795 100 204',
    department: 'IT',
    jobTitle: 'Systems Analyst',
    dateHired: '2022-06-09',
    status: 'Active'
  },
  {
    employeeId: 'DMK-130',
    fullName: 'Grace Wairimu',
    email: 'grace.wairimu@company.com',
    phone: '+254 701 889 321',
    department: 'Sales',
    jobTitle: 'Regional Sales Rep',
    dateHired: '2019-11-05',
    status: 'Probation'
  },
  {
    employeeId: 'DMK-141',
    fullName: 'Samuel Mwangangi',
    email: 'samuel.mwangangi@company.com',
    phone: '+254 716 220 515',
    department: 'Logistics',
    jobTitle: 'Warehouse Coordinator',
    dateHired: '2017-02-11',
    status: 'Active'
  }
];

const STORAGE_KEY = 'delMonteEmployeeRecords';

function loadEmployees() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) && saved.length ? saved : [...SAMPLE_EMPLOYEES];
  } catch (error) {
    return [...SAMPLE_EMPLOYEES];
  }
}

function persistEmployees(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function renderEmployeeTable() {
  const tableBody = document.getElementById('employee-table-body');
  if (!tableBody) return;

  const searchInput = document.getElementById('employee-search');
  const departmentFilter = document.getElementById('department-filter');
  const statusFilter = document.getElementById('status-filter');

  const query = (searchInput ? searchInput.value.trim().toLowerCase() : '');
  const deptValue = departmentFilter ? departmentFilter.value : 'all';
  const statusValue = statusFilter ? statusFilter.value : 'all';

  const employees = loadEmployees();

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      !query ||
      employee.employeeId.toLowerCase().includes(query) ||
      employee.fullName.toLowerCase().includes(query);

    const matchesDepartment = deptValue === 'all' || employee.department === deptValue;
    const matchesStatus = statusValue === 'all' || employee.status === statusValue;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  if (!filteredEmployees.length) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-state">No employees match the current filters.</td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = filteredEmployees
    .map((employee) => {
      const badgeClass = employee.status.toLowerCase().replace(/\s+/g, '-');
      return `
        <tr>
          <td>${employee.employeeId}</td>
          <td>${employee.fullName}</td>
          <td>${employee.department}</td>
          <td>${employee.jobTitle}</td>
          <td>${employee.email}<br>${employee.phone}</td>
          <td><span class="status-badge ${badgeClass}">${employee.status}</span></td>
        </tr>
      `;
    })
    .join('');
}

function initializeEmployeesPage() {
  const searchInput = document.getElementById('employee-search');
  const departmentFilter = document.getElementById('department-filter');
  const statusFilter = document.getElementById('status-filter');

  if (!searchInput && !departmentFilter && !statusFilter) return;

  [searchInput, departmentFilter, statusFilter].forEach((element) => {
    if (element) {
      element.addEventListener('input', renderEmployeeTable);
      element.addEventListener('change', renderEmployeeTable);
    }
  });

  renderEmployeeTable();
}

function validateForm(form) {
  const fields = [
    'employeeId',
    'fullName',
    'email',
    'phone',
    'department',
    'jobTitle',
    'dateHired',
    'status'
  ];

  let isValid = true;

  fields.forEach((fieldName) => {
    const field = form.querySelector(`#${fieldName}`);
    if (!field) return;

    if (!field.value.trim()) {
      field.setAttribute('aria-invalid', 'true');
      isValid = false;
    } else {
      field.setAttribute('aria-invalid', 'false');
    }
  });

  const emailField = form.querySelector('#email');
  if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
    emailField.setAttribute('aria-invalid', 'true');
    isValid = false;
  }

  return isValid;
}

function initializeEmployeeForm() {
  const form = document.getElementById('employee-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const messageBox = document.getElementById('form-message');
    if (!validateForm(form)) {
      messageBox.textContent = 'Please complete all required fields before saving the employee record.';
      messageBox.className = 'form-message error';
      return;
    }

    const employeeData = {
      employeeId: document.getElementById('employeeId').value.trim(),
      fullName: document.getElementById('fullName').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      department: document.getElementById('department').value,
      jobTitle: document.getElementById('jobTitle').value.trim(),
      dateHired: document.getElementById('dateHired').value,
      status: document.getElementById('status').value
    };

    const employees = loadEmployees();
    employees.unshift(employeeData);
    persistEmployees(employees);

    messageBox.textContent = `Employee ${employeeData.fullName} was added successfully. This is a front-end demo only and is not connected to a database.`;
    messageBox.className = 'form-message success';
    form.reset();
  });
}

function setActiveNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link');

  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveNavigation();
  initializeEmployeesPage();
  initializeEmployeeForm();
});
