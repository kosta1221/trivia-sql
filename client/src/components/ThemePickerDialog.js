import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

function ThemePickerDialog({ onClose, selectedValue, open }) {
	const handleClose = () => {
		onClose(selectedValue);
	};

	const handle = (value) => {
		onClose(value);
	};

	return (
		<Dialog onClose={handleClose} aria-labelledby="theme-picker-dialog-title" open={open}>
			<DialogTitle id="theme-picker-dialog-title">Pick a Theme</DialogTitle>
		</Dialog>
	);
}

export default ThemePickerDialog;
