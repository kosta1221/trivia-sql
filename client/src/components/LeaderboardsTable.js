import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const useStyles = makeStyles((theme) => ({
	table: {
		minWidth: 700,
		backgroundColor: theme.palette.paperBackground,
	},
}));

export default function LeaderboardsTable({ data }) {
	const classes = useStyles();

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell align="center">Avatar id</StyledTableCell>
						<StyledTableCell align="center">Place</StyledTableCell>
						<StyledTableCell align="center">Name</StyledTableCell>
						<StyledTableCell align="center">Score</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((row, i) => (
						<StyledTableRow key={`row-${i}`}>
							<StyledTableCell component="th" scope="row" align="center">
								{row.avatar_id}
							</StyledTableCell>
							<StyledTableCell align="center">{i + 1}</StyledTableCell>
							<StyledTableCell align="center">{row.name}</StyledTableCell>
							<StyledTableCell align="center">{row.score}</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
