// Builds the page from PROFILE (data.js), plus the terminal and command menu.

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

// Tailwind classes used by several items
const SUMMARY =
  "relative flex gap-2.5 items-baseline py-2.5 cursor-pointer list-none [&::-webkit-details-marker]:hidden before:content-['+'] before:text-acc before:w-[1ch] group-open:before:content-['−']";
const CHIP =
  "border border-line rounded-full px-3 py-0.5 text-[13px] cursor-pointer hover:border-acc aria-pressed:bg-acc aria-pressed:border-acc aria-pressed:text-accink";

let filter = null; // tool selected in ~/stack, or null

/* ---------- Sections ---------- */

function renderAbout() {
  $("#tagline").textContent = PROFILE.tagline;
  $("#now-list").innerHTML = PROFILE.now
    .map(
      (text) =>
        `<li class="py-0.5 before:content-['>_'] before:text-acc">${text}</li>`,
    )
    .join("");
}

function renderStack() {
  $("#stack-list").innerHTML = Object.entries(PROFILE.stack)
    .map(
      ([group, tools]) => `
    <div class="text-xs text-mute mt-2">${group}</div>
    <div class="flex flex-wrap gap-1.5 mt-1.5 mb-3">
      ${tools.map((tool) => `<button class="${CHIP}" aria-pressed="false" data-tool="${tool}">${tool}</button>`).join("")}
    </div>`,
    )
    .join("");
}

function renderBackground() {
  $("#background-list").innerHTML = PROFILE.background
    .map(
      (role) => `
    <details class="group pl-3.5">
      <summary class="${SUMMARY}">
        <span class="absolute -left-[21px] top-[17px] w-2.5 h-2.5 rounded-full bg-acc"></span>
        <b class="font-semibold">${role.title}</b>
      </summary>
      <ul class="text-mute mb-3 ml-[2.2ch]">
        ${role.points.map((p) => `<li class="py-0.5 before:content-['–_'] before:text-acc">${p}</li>`).join("")}
      </ul>
    </details>`,
    )
    .join("");
}

function renderLinks() {
  $("#link-list").innerHTML = PROFILE.links
    .map(
      (link) => `
    <a href="${link.url}" target="_blank" rel="noopener" class="border border-line rounded-lg px-3 py-1.5 flex justify-between hover:border-acc">
      <span>${link.label}</span><span class="text-mute">open</span>
    </a>`,
    )
    .join("");
}

function renderProjects() {
  const projects = PROFILE.projects.filter(
    (p) => !filter || p.tags.includes(filter),
  );

  $("#projects-title").textContent = filter
    ? `~/projects --filter ${filter} (${projects.length}) · tap the tool again to clear`
    : `~/projects (${projects.length})`;

  $("#project-list").innerHTML = projects.length
    ? projects
        .map(
          (p) => `
    <details id="project-${p.name}" class="group border-t border-line first:border-t-0">
      <summary class="${SUMMARY}">
        <b class="font-semibold">${p.name}</b>
        <span class="text-mute">${p.summary}</span>
        <span class="ml-auto text-xs text-mute text-right">${p.tags.join(", ")}</span>
      </summary>
      <p class="mb-3 ml-[2.2ch]">${p.details} <a class="text-acc underline" href="${p.url}" target="_blank" rel="noopener">view source</a></p>
    </details>`,
        )
        .join("")
    : `<div class="py-2.5 text-mute">nothing uses ${filter} yet. pick another tool.</div>`;
}

// Select a tool to filter projects (null clears the filter)
function setFilter(tool) {
  filter = tool;
  $$("[data-tool]").forEach((chip) =>
    chip.setAttribute("aria-pressed", chip.dataset.tool === tool),
  );
  renderProjects();
}

// Scroll to a project and expand it. Returns false if there is no such project.
function openProject(name) {
  if (!PROFILE.projects.some((p) => p.name === name)) return false;
  setFilter(null);
  const el = $("#project-" + name);
  el.open = true;
  el.scrollIntoView({ block: "center" });
  return true;
}

renderAbout();
renderStack();
renderBackground();
renderLinks();
renderProjects();

$("#stack-list").addEventListener("click", (e) => {
  const chip = e.target.closest("[data-tool]");
  if (chip) setFilter(filter === chip.dataset.tool ? null : chip.dataset.tool);
});

/* ---------- Terminal ---------- */
// To add a command, add a function here that returns the text to print.

const COMMANDS = {
  help: () => "commands: whoami, now, ls, open <project>, filter <tool>, clear",
  whoami: () => `${PROFILE.name} — ${PROFILE.tagline}`,
  now: () => PROFILE.now.map((x) => "- " + x).join("\n"),
  ls: () => PROFILE.projects.map((p) => p.name).join("  "),
  open: (arg) =>
    openProject(arg)
      ? "opened " + arg
      : `no project called ${arg || "(blank)"}. try ls.`,
  filter: (arg) => {
    setFilter(arg || null);
    return arg ? "filtering by " + arg : "filter cleared";
  },

  clear: () => {
    $("#terminal-output").textContent = "";
    return "";
  },
  sudo: () => "nice try.",
};

function printLine(text, isCommand) {
  const output = $("#terminal-output");
  const line = document.createElement("div");
  if (isCommand) line.className = "text-acc";
  line.textContent = text;
  output.append(line);
  output.scrollTop = output.scrollHeight;
}

printLine("type help to see what this terminal can do.");

$("#terminal-input").addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  const input = e.target.value.trim();
  e.target.value = "";
  if (!input) return;

  printLine("$ " + input, true);
  const [name, ...args] = input.split(/\s+/);
  const command = COMMANDS[name];
  const result = command
    ? command(args.join(" "))
    : `unknown command "${name}". type help.`;
  if (result) printLine(result);
});

/* ---------- Command menu (Ctrl/Cmd + K) ---------- */
// To add an action, add { label, run } to this list.

const goTo = (id) => $("#" + id).scrollIntoView({ block: "start" });

const ACTIONS = [
  ...[
    "home",
    "now",
    "stack",
    "background",
    "projects",
    "terminal",
    "links",
  ].map((id) => ({ label: "go to " + id, run: () => goTo(id) })),

  ...PROFILE.projects.map((p) => ({
    label: "open project: " + p.name,
    run: () => openProject(p.name),
  })),
];

const menu = $("#menu");
const menuInput = $("#menu-input");
let matches = [];
let active = 0;

function drawMenu() {
  matches = ACTIONS.filter((a) =>
    a.label.includes(menuInput.value.toLowerCase()),
  );
  active = Math.min(active, Math.max(matches.length - 1, 0));
  const row = "px-2.5 py-1.5 rounded-md cursor-pointer text-sm";
  $("#menu-list").innerHTML = matches.length
    ? matches
        .map(
          (a, i) =>
            `<li data-i="${i}" class="${row} ${i === active ? "bg-acc text-accink" : ""}">${a.label}</li>`,
        )
        .join("")
    : `<li class="${row} text-mute">no match. try “theme” or a project name.</li>`;
}

function openMenu() {
  menuInput.value = "";
  active = 0;
  drawMenu();
  menu.showModal();
  menu.append(cursor); // the circle shows on top of the menu
  menuInput.focus();
}

function runAction(i) {
  if (!matches[i]) return;
  menu.close();
  matches[i].run();
}

$("#open-menu").addEventListener("click", openMenu);
menuInput.addEventListener("input", () => {
  active = 0;
  drawMenu();
});

menuInput.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    active = Math.min(active + 1, matches.length - 1);
    drawMenu();
    e.preventDefault();
  } else if (e.key === "ArrowUp") {
    active = Math.max(active - 1, 0);
    drawMenu();
    e.preventDefault();
  } else if (e.key === "Enter") runAction(active);
});

$("#menu-list").addEventListener("click", (e) => {
  const row = e.target.closest("[data-i]");
  if (row) runAction(Number(row.dataset.i));
});

menu.addEventListener("click", (e) => {
  if (e.target === menu) menu.close();
}); // click the backdrop
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    openMenu();
  }
});

/* ---------- Circle cursor ---------- */

const cursor = $("#cursor");

// follow the mouse
document.addEventListener("mousemove", (e) => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  cursor.style.opacity = 1;
});

// hide it when the mouse leaves the window
document.documentElement.addEventListener("mouseleave", () => {
  cursor.style.opacity = 0;
});

// grow over things you can click
document.addEventListener("mouseover", (e) => {
  cursor.classList.toggle(
    "big",
    !!e.target.closest("a, button, summary, input, label, li[data-i]"),
  );
});

// the command menu sits above the page, so move the circle into it while it is open
menu.addEventListener("close", () => document.body.append(cursor));

/* ---------- Typing name ---------- */

function typeName() {
  const el = $("#name");
  const text = PROFILE.name;

  // skip the animation if the visitor asked for less motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = text;
    return;
  }

  let i = 0;
  let deleting = false;

  function tick() {
    el.textContent = text.slice(0, i);
    let delay = deleting ? 50 : 50; // both are fast

    if (!deleting && i === text.length) {
      deleting = true;
      delay = 2500; // pause when fully written
    } else if (deleting && i === 0) {
      deleting = false;
      delay = 1000; // pause when empty
    } else {
      i += deleting ? -1 : 1;
    }
    setTimeout(tick, delay);
  }

  tick();
}

typeName();
