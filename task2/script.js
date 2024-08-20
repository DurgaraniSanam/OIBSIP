document.addEventListener("DOMContentLoaded", function () {
    const listContainer = document.getElementById("list-container");

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            addTaskToDOM(task.title, task.desc, task.date, task.time, task.completed);
        });
        sortTasks(); 
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#list-container tr").forEach(tr => {
            const title = tr.children[0].textContent;
            const desc = tr.children[1].textContent;
            const date = tr.children[2].textContent;
            const time = tr.children[3].textContent;
            const completed = tr.classList.contains("completed");
            tasks.push({ title, desc, date, time, completed });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function addTaskToDOM(title, desc, date, time, completed = false) {
        const tr = document.createElement("tr");


        tr.innerHTML = `
            <td>${title}</td>
            <td>${desc}</td>
            <td>${date}</td>
            <td>${time}</td>
            <td class="action-cell"><img src="images/${completed ? 'checked' : 'unchecked'}.png" class="checkbox-icon" alt="Checkbox"></td>
            <td class="delete-cell"><img src="images/delete.jpg" class="delete-icon" alt="Delete"></td>
        `;

        if (completed) {
            tr.classList.add("completed");
        }
        listContainer.appendChild(tr);

        const checkboxIcon = tr.querySelector(".checkbox-icon");
        const deleteIcon = tr.querySelector(".delete-icon");

        checkboxIcon.addEventListener("click", function () {
            const isChecked = checkboxIcon.getAttribute("src") === "images/unchecked.png";
            checkboxIcon.setAttribute("src", `images/${isChecked ? 'checked' : 'unchecked'}.png`);
            tr.classList.toggle("completed");
            saveTasks(); 
        });

        deleteIcon.addEventListener("click", function () {
            tr.remove();
            saveTasks(); 
        });
    }

    function sortTasks() {
        const rowsArray = Array.from(document.querySelectorAll("#list-container tr"));
        rowsArray.sort((a, b) => {
            const dateTimeA = new Date(`${a.children[2].textContent} ${a.children[3].textContent}`);
            const dateTimeB = new Date(`${b.children[2].textContent} ${b.children[3].textContent}`);
            return dateTimeA - dateTimeB;
        });
        rowsArray.forEach(row => listContainer.appendChild(row)); 
    }

    function addTask() {
        const title = document.getElementById("input-title").value;
        const desc = document.getElementById("input-desc").value;
        const date = document.getElementById("input-date").value;
        const time = document.getElementById("input-time").value;
       

        if (title && desc && date) {
            addTaskToDOM(title, desc, date, time);
            sortTasks(); 
            saveTasks(); 
            document.getElementById("input-title").value = "";
            document.getElementById("input-desc").value = "";
            document.getElementById("input-date").value = "";
            document.getElementById("input-time").value = "";
        } else {
            alert("Please fill in all fields");
        }
    }

    document.querySelector(".addtask button").addEventListener("click", addTask);
    loadTasks();
});
