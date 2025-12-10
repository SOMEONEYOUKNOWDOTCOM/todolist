let activities = [];
let undoStack = [];
let redoStack = [];

window.onload = function () {
  const overlay = document.getElementById("overlay");
  const passwordPrompt = document.getElementById("passwordPrompt");
  const passwordInput = document.getElementById("passwordInput");
  const submitPassword = document.getElementById("submitPassword");
  const errorMessage = document.getElementById("errorMessage");
  const activityInput = document.getElementById("activityInput");

  const correctPassword = "221008"; // Optional hardcoded password

  overlay.style.display = "block";
  passwordPrompt.style.display = "block";

  document.getElementById("pronun").onclick = whoareyou;
  document.getElementById("dateButton").onclick = showDateAndTime;
  document.getElementById("activityTime").onclick = addTime;
  submitPassword.onclick = handlePasswordSubmission;

  passwordInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") handlePasswordSubmission();
  });

  activityInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const itemName = activityInput.value.trim();
      if (itemName && itemName.toLowerCase() !== "that is all") {
        activities.push({
          name: itemName,
          time: "",
          priority: "",
          deadline: "",
          progress: "",
          category: "",
          checked: false,
          visibility: ""
        });
        renderList();
        activityInput.value = "";
      } else if (itemName.toLowerCase() === "that is all") {
        activityInput.style.display = "none";
      }
    }
  });

  function handlePasswordSubmission() {
    const enteredPassword = passwordInput.value;
    if (
      enteredPassword === correctPassword ||
      enteredPassword === "theeminenceinshadow" ||
      enteredPassword === "66778899000099887766"
    ) {
      overlay.style.display = "none";
      passwordPrompt.style.display = "none";
      document.getElementById("IDK").style.display = "block";
      document.getElementById("pronun").style.display = "inline-block";
      document.getElementById("dateButton").style.display = "inline-block";
      document.getElementById("activityTime").style.display = "inline-block";
      activityInput.style.display = "inline-block";
      document.getElementById("dateDisplay").style.display = "block";
      document.getElementById("myList").style.display = "block";
      document.getElementById("Reminder").style.display = "block";
    } else {
      errorMessage.style.display = "block";
      passwordInput.value = "";
    }
  }
};

function whoareyou() {
  const pronoun = prompt("Who is this for?");
  if (pronoun) {
    const pro = pronoun.toLowerCase();
    const formattedPerson = pro.charAt(0).toUpperCase() + pro.slice(1).toLowerCase();
    const isDev = [
      "admin the eminence in shadow",
      "owner the eminence in shadow",
      "manager the eminence in shadow",
      "owen the eminence in shadow",
      "admin 404",
      "owner 404",
      "manager 404",
      "owen 404",
      "66778899000099887766",
      "shadow"
    ].includes(pro);

    if (isDev) {
      document.getElementById("IDK").textContent =
        "Welcome, Owen Jahswill! You have been granted full developer and admin rights. 🛠️🧠";
      const sound = document.getElementById("devSound");
      if (sound) sound.play();
      document.body.style.transition = "background 2s ease-in-out, color 1s";
      document.body.style.background =
        "linear-gradient(270deg, #000000, #222222, #111111)";
      document.body.style.color = "white";
      document.body.style.border = "5px solid gold";
      document.body.style.boxShadow = "0 0 20px gold";

      const devNote = document.createElement("div");
      devNote.textContent = "🛡️ Developer Mode Activated";
      devNote.id = "devBanner";
      document.body.appendChild(devNote);

      const styleGlow = document.createElement("style");
      styleGlow.textContent = `
        #devBanner {
          position: fixed;
          top: 10px;
          right: 10px;
          background: black;
          color: lime;
          padding: 10px 15px;
          border: 2px solid lime;
          font-weight: bold;
          animation: neonGlow 1.5s infinite alternate;
          font-family: monospace;
          z-index: 9999;
        }
        @keyframes neonGlow {
          from { box-shadow: 0 0 5px lime, 0 0 10px lime; }
          to { box-shadow: 0 0 15px lime, 0 0 30px lime; }
        }
        button {
          transition: transform 0.2s ease, background-color 0.3s ease;
        }
        button:hover {
          transform: scale(1.1);
          background-color: gold !important;
          color: black !important;
        }
      `;
      document.head.appendChild(styleGlow);

      // Create Dev Panel (3 basic buttons)
      const devPanel = document.createElement("div");
      devPanel.innerHTML = `
        <h3 style="margin:10px 0;">🧰 Dev Control Panel</h3>
        <button id="addUserBtn">➕ Add User</button>
        <button id="removeTaskBtn">❌ Remove Task</button>
        <button id="showAllBtn">📋 Show All Tasks</button>
      `;
      devPanel.style.position = "fixed";
      devPanel.style.bottom = "20px";
      devPanel.style.right = "20px";
      devPanel.style.background = "#111";
      devPanel.style.padding = "15px";
      devPanel.style.border = "2px solid lime";
      devPanel.style.color = "white";
      devPanel.style.zIndex = "10000";
      devPanel.style.borderRadius = "8px";
      devPanel.style.boxShadow = "0 0 15px lime";
      document.body.appendChild(devPanel);

      document.getElementById("addUserBtn").onclick = () => {
        const newUser = prompt("Enter new user's name:");
        if (newUser) alert("User '" + newUser + "' added (simulated).");
      };

      document.getElementById("removeTaskBtn").onclick = () => {
        const taskToRemove = prompt("Enter the task name to remove:");
        if (taskToRemove) {
          const index = activities.findIndex(
            (a) => a.name.toLowerCase() === taskToRemove.toLowerCase()
          );
          if (index !== -1) {
            addToUndoStack({ action: "remove", task: activities[index] });
            activities.splice(index, 1);
            renderList();
            alert("Task removed.");
          } else {
            alert("Task not found.");
          }
        }
      };

      document.getElementById("showAllBtn").onclick = () => {
        const allTasks = activities
          .map((a) => `• ${a.name} @ ${a.time || "N/A"}`)
          .join("\n");
        alert(allTasks || "No tasks yet.");
      };

      // Extra Dev Panel (10+ new buttons)
      const extraDevPanel = document.createElement("div");
      extraDevPanel.innerHTML = `
        <button id="changeActivityNameBtn">✍️ Change Activity Name</button>
        <button id="toggleAllTasksBtn">✅ Toggle All Tasks</button>
        <button id="sortActivitiesBtn">🔤 Sort Activities</button>
        <button id="addNewActivityBtn">➕ Add New Activity</button>
        <button id="setAllTasksToTimeBtn">⏰ Set Time For All Tasks</button>
        <button id="setPriorityBtn">📊 Set Task Priority</button>
        <button id="setDeadlineBtn">🗓️ Set Task Deadline</button>
        <button id="setProgressBtn">📈 Set Task Progress</button>
        <button id="undoBtn">↩️ Undo</button>
        <button id="redoBtn">↪️ Redo</button>
        <button id="setVisibilityBtn">👁️ Set Task Visibility</button>
        <button id="setCategoryBtn">🏷️ Set Task Category</button>
        <button id="filterByCategoryBtn">🔎 Filter by Category</button>
        <button id="resetDevSettingsBtn">🔄 Reset Dev Settings</button>
        <button id="exportListBtn">⬇️ Export List</button>
        <button id="importFilesBtn">📥 Import Files</button>
      `;
      extraDevPanel.style.position = "fixed";
      extraDevPanel.style.bottom = "100px";
      extraDevPanel.style.right = "20px";
      extraDevPanel.style.background = "#222";
      extraDevPanel.style.padding = "10px";
      extraDevPanel.style.border = "2px solid cyan";
      extraDevPanel.style.color = "white";
      extraDevPanel.style.zIndex = "10000";
      extraDevPanel.style.borderRadius = "8px";
      extraDevPanel.style.display = "flex";
      extraDevPanel.style.flexWrap = "wrap";
      extraDevPanel.style.gap = "10px";
      document.body.appendChild(extraDevPanel);

      document.getElementById("changeActivityNameBtn").onclick = changeActivityName;
      document.getElementById("toggleAllTasksBtn").onclick = toggleAllTasks;
      document.getElementById("sortActivitiesBtn").onclick = sortActivities;
      document.getElementById("addNewActivityBtn").onclick = addNewActivity;
      document.getElementById("setAllTasksToTimeBtn").onclick = setAllTasksToTime;
      document.getElementById("setPriorityBtn").onclick = function () {
        const taskName = prompt("Enter task name:");
        const priority = prompt("Enter priority (High, Medium, Low):");
        if (taskName && priority) setPriority(taskName, priority);
      };
      document.getElementById("setDeadlineBtn").onclick = function () {
        const taskName = prompt("Enter task name:");
        const deadline = prompt("Enter deadline:");
        if (taskName && deadline) setDeadline(taskName, deadline);
      };
      document.getElementById("setProgressBtn").onclick = function () {
        const taskName = prompt("Enter task name:");
        const progress = prompt("Enter progress (e.g., 50%):");
        if (taskName && progress) setProgress(taskName, progress);
      };
      document.getElementById("undoBtn").onclick = undo;
      document.getElementById("redoBtn").onclick = redo;
      document.getElementById("setVisibilityBtn").onclick = function () {
        const taskName = prompt("Enter task name:");
        const visibility = prompt("Enter visibility (public/private):");
        if (taskName && visibility) setVisibility(taskName, visibility);
      };
      document.getElementById("setCategoryBtn").onclick = function () {
        const taskName = prompt("Enter task name:");
        const category = prompt("Enter category:");
        if (taskName && category) setCategory(taskName, category);
      };
      document.getElementById("filterByCategoryBtn").onclick = filterByCategory;
      document.getElementById("resetDevSettingsBtn").onclick = resetDeveloperSettings;
      document.getElementById("exportListBtn").onclick = exportListDev;
      document.getElementById("importFilesBtn").onclick = importFilesDev;
    } else {
      document.getElementById("IDK").textContent =
        "This is " + formattedPerson + "'s Very Own To-Do List";
    }
  }
}

function renderList(filteredArr) {
  const myList = document.getElementById("myList");
  myList.innerHTML = "";
  const list = filteredArr || activities;
  list.forEach((activity) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = activity.checked || false;
    checkbox.onchange = () => { activity.checked = checkbox.checked; };
    const label = document.createElement("label");
    let extras = "";
    if (activity.priority) extras += " | Priority: " + activity.priority;
    if (activity.deadline) extras += " | Deadline: " + activity.deadline;
    if (activity.progress) extras += " | Progress: " + activity.progress;
    if (activity.category) extras += " | Category: " + activity.category;
    label.textContent = ` ${activity.name} - Time: ${activity.time}${extras}`;
    li.appendChild(checkbox);
    li.appendChild(label);
    myList.appendChild(li);
  });
}

function showDateAndTime() {
  const currentDate = new Date();
  const dateString = currentDate.toDateString();
  function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    document.getElementById("dateDisplay").textContent =
      "Today's date is: " + dateString + " and the time is: " + formattedTime;
  }
  updateTime();
  setInterval(updateTime, 1000);
  document.getElementById("dateButton").remove();
  document.getElementById("activityTime").style.top = "-20px";
  document.getElementById("dateDisplay").style.top = "-30px";
  document.getElementById("Reminder").style.top = "-60px";
}

function addTime() {
  const valuetime = prompt("Add time for your activities! Time format (Example): '5:00 pm'");
  if (valuetime) {
    const activityToUpdate = prompt("Which activity do you want to add time to?");
    let found = false;
    for (let i = 0; i < activities.length; i++) {
      if (activities[i].name.toLowerCase() === activityToUpdate.toLowerCase()) {
        addToUndoStack({ action: "setTime", task: activities[i], prevTime: activities[i].time });
        activities[i].time = valuetime;
        found = true;
        break;
      }
    }
    if (found) {
      renderList();
    } else {
      alert("Activity not found!");
    }
  }
}

function checkDeveloperRights(name) {
  return name.toLowerCase() === "shadow";
}

function changeActivityName() {
  const name = prompt("Enter your name:");
  if (checkDeveloperRights(name)) {
    const oldName = prompt("Enter the name of the activity you want to change:");
    const newName = prompt("Enter the new name for the activity:");
    let activityFound = false;
    activities.forEach((activity) => {
      if (activity.name.toLowerCase() === oldName.toLowerCase()) {
        addToUndoStack({ action: "changeName", task: activity, prevName: activity.name });
        activity.name = newName;
        activityFound = true;
      }
    });
    if (activityFound) {
      renderList();
      alert("Activity name updated!");
    } else {
      alert("Activity not found!");
    }
  } else {
    alert("You do not have developer rights.");
  }
}

function toggleAllTasks() {
  const name = prompt("Enter your name:");
  if (checkDeveloperRights(name)) {
    activities.forEach((activity) => {
      addToUndoStack({ action: "toggle", task: activity, prevChecked: activity.checked });
      activity.checked = !activity.checked;
    });
    renderList();
    alert("All tasks have been toggled!");
  } else {
    alert("You do not have developer rights.");
  }
}

function sortActivities() {
  const sortMethod = prompt("Sort by alphabet (a), priority (p), or progress (r)?").toLowerCase();
  const name = prompt("Enter your name:");
  if (checkDeveloperRights(name)) {
    if (sortMethod === "a") {
      activities.sort((a, b) => a.name.localeCompare(b.name));
      alert("Activities sorted alphabetically!");
    } else if (sortMethod === "p") {
      const order = ["High", "Medium", "Low"];
      activities.sort((a, b) => order.indexOf(a.priority) - order.indexOf(b.priority));
      alert("Activities sorted by priority!");
    } else if (sortMethod === "r") {
      activities.sort((a, b) => {
        let progA = parseInt(a.progress) || 0;
        let progB = parseInt(b.progress) || 0;
        return progA - progB;
      });
      alert("Activities sorted by progress!");
    } else {
      alert("Invalid sort method.");
      return;
    }
    renderList();
  } else {
    alert("You do not have developer rights.");
  }
}

function addNewActivity() {
  const name = prompt("Enter your name:");
  if (checkDeveloperRights(name)) {
    const newActivityName = prompt("Enter the name of the new activity:");
    const newActivityTime = prompt("Enter the time for the new activity:");
    if (newActivityName && newActivityTime) {
      activities.push({
        name: newActivityName,
        time: newActivityTime,
        priority: "",
        deadline: "",
        progress: "",
        category: "",
        checked: false,
        visibility: ""
      });
      addToUndoStack({ action: "add", task: { name: newActivityName, time: newActivityTime } });
      renderList();
      alert("New activity added!");
    }
  } else {
    alert("You do not have developer rights.");
  }
}

function setAllTasksToTime() {
  const name = prompt("Enter your name:");
  if (checkDeveloperRights(name)) {
    const newTime = prompt("Enter the new time for all tasks:");
    if (newTime) {
      activities.forEach((activity) => {
        addToUndoStack({ action: "setTime", task: activity, prevTime: activity.time });
        activity.time = newTime;
      });
      renderList();
      alert("All tasks have been set to the new time!");
    }
  } else {
    alert("You do not have developer rights.");
  }
}

function setPriority(taskName, priority) {
  const name = prompt("Enter your name:");
  if (checkDeveloperRights(name)) {
    const task = activities.find(a => a.name.toLowerCase() === taskName.toLowerCase());
    if (task) {
      addToUndoStack({ action: "setPriority", task: task, prevPriority: task.priority });
      task.priority = priority;
      renderList();
    } else {
      alert("Task not found!");
    }
  } else {
    alert("You do not have developer rights.");
  }
}

function setDeadline(taskName, deadline) {
  const name = prompt("Enter your name:");
  if (checkDeveloperRights(name)) {
    const task = activities.find(a => a.name.toLowerCase() === taskName.toLowerCase());
    if (task) {
      addToUndoStack({ action: "setDeadline", task: task, prevDeadline: task.deadline });
      task.deadline = deadline;
      renderList();
    } else {
      alert("Task not found!");
    }
  } else {
    alert("You do not have developer rights.");
  }
}

function setProgress(taskName, progress) {
  const name = prompt("Enter your name:");
  if (checkDeveloperRights(name)) {
    const task = activities.find(a => a.name.toLowerCase() === taskName.toLowerCase());
    if (task) {
      addToUndoStack({ action: "setProgress", task: task, prevProgress: task.progress });
      task.progress = progress;
      renderList();
    } else {
      alert("Task not found!");
    }
  } else {
    alert("You do not have developer rights.");
  }
}

function addToUndoStack(action) {
  undoStack.push(action);
}

function undo() {
  const name = prompt("Enter your name:");
  if (checkDeveloperRights(name)) {
    if (undoStack.length > 0) {
      const lastAction = undoStack.pop();
      redoStack.push(lastAction);
      switch(lastAction.action) {
        case "add":
          const index = activities.findIndex(a => a.name === lastAction.task.name && a.time === lastAction.task.time);
          if(index !== -1){
            activities.splice(index, 1);
            alert("Undo: Added task removed: " + lastAction.task.name);
          }
          break;
        case "setTime":
          lastAction.task.time = lastAction.prevTime;
          alert("Undo: Time change undone for: " + lastAction.task.name);
          break;
        case "changeName":
          lastAction.task.name = lastAction.prevName;
          alert("Undo: Name change undone for: " + lastAction.task.name);
          break;
        case "setPriority":
          lastAction.task.priority = lastAction.prevPriority;
          alert("Undo: Priority change undone for: " + lastAction.task.name);
          break;
        case "setDeadline":
          lastAction.task.deadline = lastAction.prevDeadline;
          alert("Undo: Deadline change undone for: " + lastAction.task.name);
          break;
        case "setProgress":
          lastAction.task.progress = lastAction.prevProgress;
          alert("Undo: Progress change undone for: " + lastAction.task.name);
          break;
        case "toggle":
          lastAction.task.checked = lastAction.prevChecked;
          alert("Undo: Toggle change undone for: " + lastAction.task.name);
          break;
        case "setVisibility":
          lastAction.task.visibility = lastAction.prevVisibility;
          alert("Undo: Visibility change undone for: " + lastAction.task.name);
          break;
        case "setCategory":
          lastAction.task.category = lastAction.prevCategory;
          alert("Undo: Category change undone for: " + lastAction.task.name);
          break;
        default:
          alert("No known undo action.");
      }
      renderList();
    } else {
      alert("No actions to undo.");
    }
  } else {
    alert("You do not have developer rights.");
  }
}

function redo() {
  const name = prompt("Enter your name:");
  if (checkDeveloperRights(name)) {
    if (redoStack.length > 0) {
      const lastRedo = redoStack.pop();
      undoStack.push(lastRedo);
      switch(lastRedo.action) {
        case "add":
          activities.push(lastRedo.task);
          alert("Redo: Task re-added: " + lastRedo.task.name);
          break;
        case "setTime":
          lastRedo.task.time = lastRedo.newTime;
          alert("Redo: Time change redone for: " + lastRedo.task.name);
          break;
        case "changeName":
          lastRedo.task.name = lastRedo.newName;
          alert("Redo: Name change redone for: " + lastRedo.task.name);
          break;
        case "setPriority":
          lastRedo.task.priority = lastRedo.newPriority;
          alert("Redo: Priority change redone for: " + lastRedo.task.name);
          break;
        case "setDeadline":
          lastRedo.task.deadline = lastRedo.newDeadline;
          alert("Redo: Deadline change redone for: " + lastRedo.task.name);
          break;
        case "setProgress":
          lastRedo.task.progress = lastRedo.newProgress;
          alert("Redo: Progress change redone for: " + lastRedo.task.name);
          break;
        case "toggle":
          lastRedo.task.checked = lastRedo.newChecked;
          alert("Redo: Toggle change redone for: " + lastRedo.task.name);
          break;
        case "setVisibility":
          lastRedo.task.visibility = lastRedo.newVisibility;
          alert("Redo: Visibility change redone for: " + lastRedo.task.name);
          break;
        case "setCategory":
          lastRedo.task.category = lastRedo.newCategory;
          alert("Redo: Category change redone for: " + lastRedo.task.name);
          break;
        default:
          alert("No known redo action.");
      }
      renderList();
    } else {
      alert("No actions to redo.");
    }
  } else {
    alert("You do not have developer rights.");
  }
}

function setVisibility(taskName, visibility) {
  const name = prompt("Enter your name:");
  if (checkDeveloperRights(name)) {
    const task = activities.find(a => a.name.toLowerCase() === taskName.toLowerCase());
    if (task) {
      addToUndoStack({ action: "setVisibility", task: task, prevVisibility: task.visibility });
      task.visibility = visibility;
      renderList();
    } else {
      alert("Task not found!");
    }
  } else {
    alert("You do not have developer rights.");
  }
}

// Additional three developer functions

function setCategory(taskName, category) {
  const name = prompt("Enter your name:");
  if (checkDeveloperRights(name)) {
    const task = activities.find(a => a.name.toLowerCase() === taskName.toLowerCase());
    if (task) {
      addToUndoStack({ action: "setCategory", task: task, prevCategory: task.category });
      task.category = category;
      renderList();
    } else {
      alert("Task not found!");
    }
  } else {
    alert("You do not have developer rights.");
  }
}

function filterByCategory() {
  const name = prompt("Enter your name:");
  if (checkDeveloperRights(name)) {
    const category = prompt("Enter category to filter by:");
    const filteredActivities = activities.filter(a => (a.category || "").toLowerCase() === category.toLowerCase());
    renderList(filteredActivities);
    alert("Filtered by category: " + category);
  } else {
    alert("You do not have developer rights.");
  }
}

function resetDeveloperSettings() {
  const name = prompt("Enter your name:");
  if (checkDeveloperRights(name)) {
    document.body.style.background = "";
    document.body.style.color = "";
    document.body.style.border = "";
    document.body.style.boxShadow = "";
    alert("Developer settings have been reset.");
  } else {
    alert("You do not have developer rights.");
  }
}

// NEW: Export to-do list (developer only)
function exportListDev() {
  const name = prompt("Enter your name:");
  if (checkDeveloperRights(name)) {
    const text = activities
      .map(a => `Task: ${a.name}, Time: ${a.time}`)
      .join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "todo-list.txt";
    link.click();
    alert("To-Do List exported.");
  } else {
    alert("You do not have developer rights.");
  }
}

// NEW: Import files (pics, vids, files) to to-do list (developer only)
function importFilesDev() {
  const name = prompt("Enter your name:");
  if (checkDeveloperRights(name)) {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = true;
    // Accept images, videos, and documents
    fileInput.accept = "image/*,video/*,application/pdf,.doc,.docx,.txt";
    fileInput.onchange = (event) => {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const newActivity = {
          name: "Attachment: " + file.name,
          time: "",
          attachments: [URL.createObjectURL(file)],
          priority: "",
          deadline: "",
          progress: "",
          category: "",
          checked: false,
          visibility: ""
        };
        activities.push(newActivity);
      }
      renderList();
      alert("Files imported as new tasks.");
    };
    fileInput.click();
  } else {
    alert("You do not have developer rights.");
  }
}

// Developer rights for "shadow" (admin access)
