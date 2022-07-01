// Selector for Images and buttons
const ELEMENT_SELECTORS = {
    checkboxClass: '.ckGgle',
    dateCheckboxClass: '.R4HkWb',
    deleteButton: 'button[aria-label="Delete"]',
    languageAgnosticDeleteButton: 'div[data-delete-origin] > button',
    confirmationButton: '#yDmH0d > div.llhEMd.iWO5td > div > div.g3VIld.V639qd.bvQPzd.oEOLpc.Up8vH.J9Nfi.A9Uzve.iWO5td > div.XfpsVe.J9fJmf > button.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.nCP5yc.kHssdc.HvOprf'
}

const delete_cycle = 20000;
const press_button_delay = 2000;
const MAX_RETRIES = 10;

let dateCount = 0;

let deleteTask = setInterval(() => {

	let attemptCount = 1;

	var checkboxes;
	do {
		console.log(`#     Selecting date checkboxes...`);
		checkboxes = document.querySelectorAll(ELEMENT_SELECTORS['dateCheckboxClass']);
	} while (checkboxes.length <= 0 && attemptCount++ < MAX_RETRIES);

	if (checkboxes.length <= 0) {
		console.log("# No more images to delete.");
		clearInterval(deleteTask);
		console.log("# Tool exited.");
		return;
	}

	console.log(`#     Selecting ${checkboxes.length} days...`);
	checkboxes.forEach((checkbox) => { checkbox.click() });

	setTimeout(() => {
		console.log(`#     Pressing delete button for ${checkboxes.length} days...`);
		try {
			const deleteButton = document.querySelector(ELEMENT_SELECTORS['languageAgnosticDeleteButton']);
			deleteButton.click();
		} catch {
			const deleteButton = document.querySelector(ELEMENT_SELECTORS['deleteButton']);
			deleteButton.click();
		}

		setTimeout(() => {
			console.log(`#     Confirming delete for ${checkboxes.length} days...`);
			const confirmation_button = document.querySelector(ELEMENT_SELECTORS['confirmationButton']);
			confirmation_button.click();
			
			console.log(`#     Deleting ${checkboxes.length} days...`);

			dateCount += checkboxes.length;
			console.log(`# Deleted ${dateCount} days in total`);
			
		}, press_button_delay);

	}, press_button_delay);
	
}, delete_cycle);
