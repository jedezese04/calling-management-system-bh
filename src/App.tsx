import { Container,  Stack, Typography } from '@mui/material'
import { DndTableGroup } from './containers/DnDTableGroup';
import { SelectDoctor, SelectLocation } from './containers';
import "./App.css"

// Matching fields between Raw Data and Table's column name
const columnKeys: { [key: string]: string } = {
  "HN": "hn",
  "Name": "name",
  "Appointment time": "appTime",
  "Arrived at": "arrivedAt",
  "Called at": "calledAt",
  "Lab status": "labStatus",
  "Action": "action",
  "Seq": "seq"
};

const initialPatients = [
  { hn: '1', name: 'John Doe', appTime: '09:00', arrivedAt: '09:05', labStatus: 'Waiting', calledAt: '09:10' },
  { hn: '2', name: 'Jane Smith', appTime: '09:30', arrivedAt: '09:35', labStatus: 'Called', calledAt: '09:40' },
];
const secondPatients = [
  { hn: '3', name: 'Jane Smith', appTime: '09:30', arrivedAt: '09:35', labStatus: 'Called', calledAt: '09:40' },
]

const tables = [
  { 
    name: "Current Queue",
    columns: ["HN", "Name", "Appointment time", "Called at"],
    items: initialPatients
  },
  { 
    name: "Pending Queue",
    columns: ["Seq", "HN", "Name", "Arrived at", "Appointment time", "Action"],
    items: secondPatients
  },
  { 
    name: "Appointment List",
    columns: ["HN", "Name", "Arrived at", "Appointment time", "Lab status"],
    items: []
  },
  { 
    name: "Pending to investigate or depart",
    columns: ["HN", "Name", "Appointment time"],
    items: []
  }
]

function App() {
  return (
		<Container>
			<Stack>
				<Stack
					direction={"row"}
					spacing={2}
					marginY={2}
					justifyContent={"center"}
				>
					<Stack direction={"row"} spacing={1} alignItems={"center"}>
						<Typography>Select Doctor :</Typography>
						<SelectDoctor onSelect={(e) => {}} />
					</Stack>
					<Stack direction={"row"} spacing={1} alignItems={"center"}>
						<Typography>Select Location :</Typography>
						<SelectLocation onSelect={(e) => {}} />
					</Stack>
				</Stack>
				<DndTableGroup
					columnKeys={columnKeys}
					tables={tables}
					pendingQueueTableActionsClicked={(action, data) => {
						if (action === "message") {
							console.log("Message action")
							console.log(data)
						} else if (action === "phone") {
							console.log("Phone action")
							console.log(data)
						}
					}}
				/>
			</Stack>
		</Container>
  )
}

export default App;

