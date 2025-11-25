"use client";


import { use, useState, useEffect, useReducer, createContext, useContext } from "react";
import ChatAssistant from "../../components/chatassistant";
import { useSession } from "next-auth/react";

// Dimension size limits
const Min_Dimension_Size = 1;
const Max_Dimension_Size = 5;


// Connection order for the rotations
const ConnectionOrder = [
	{Direction: "Left", TransformClasses: "rotate-0 top-6.5 translate-x-2"},
	{Direction: "Right", TransformClasses: "rotate-180 top-6.5 left-10.25 translate-x-3.75"},
	{Direction: "Up", TransformClasses: "rotate-90 top-0.5 left-1/2 -translate-x-2"},
	{Direction: "Down", TransformClasses: "-rotate-90 bottom-3.5 left-1/2 -translate-x-2"}
];


// Entity order for the editor UI
const EntityOrder = [
	{ Path: "/Editor/Entities/Explorer.png", Name: "Explorer" },
	{ Path: "/Editor/Entities/Goal.png", Name: "Goal" },
	{ Path: "/Editor/Entities/Key.png", Name: "Key" }
]


// Initialize dictionary context
const DictionaryContext = createContext(null);

// Initialize dimension contexts and default values
const InitialDimensions = [3, 3];
const DimensionsContext = createContext(InitialDimensions);
const DimensionsDispatchContext = createContext(null);

// Initialize level data context
const InitialTileData = {
	Tile: {
		Exists: true,

		Has_Bottom_Wall: false,
		Has_Right_Wall: false
	},
	Room: {
		Exists: true,

		Connections: {
			Left: { Exists: false, Locked_By: null },
			Right: { Exists: false, Locked_By: null },
			Up: { Exists: false, Locked_By: null },
			Down: { Exists: false, Locked_By: null }
		},

		Entity: null
	}
};
const InitialData = Array.from({length: InitialDimensions[1]}, (_, Y) => Array.from({length: InitialDimensions[0]}, (_, X) => (
	JSON.parse(JSON.stringify(InitialTileData))
)));
const DataContext = createContext(InitialData);
const DataDispatchContext = createContext(null);


// Manage dimensions
function DimensionsReducer(Dimensions, Action) {
	switch (Action.Type) {
		case "SetWidth": {
			const New_Width = Math.min(Math.max(Action.Width, Min_Dimension_Size), Max_Dimension_Size);

			Action.DataDispatch({
				Type: "SetWidth",
				DataDispatch: Action.DataDispatch,
				Width: New_Width
			});


			return [New_Width, Dimensions[1]];
		}
		case "SetHeight": {
			const New_Height = Math.min(Math.max(Action.Height, Min_Dimension_Size), Max_Dimension_Size);

			Action.DataDispatch({
				Type: "SetHeight",
				DataDispatch: Action.DataDispatch,
				Height: New_Height
			});


			return [Dimensions[0], New_Height];
		}

		default: {
			throw Error("Unknown action: " + Action.Type);
		}
	}
}

// Manage level data
function DataReducer(Data, Action) {
	switch (Action.Type) {
		case "SetWidth": {
			if (Action.Width > Data[0].length) {
				return Data.map(Row => (
					[...Row, ...Array.from({length: Action.Width - Row.length}, () => (
						JSON.parse(JSON.stringify(InitialTileData))
					))]
				));
			}
			else if (Action.Width < Data[0].length) {
				Data.forEach(Row => {
					Action.DataDispatch({
						Type: "Update-Wall",
						Position: [Action.Width - 1, Data.indexOf(Row)],
						Orientation: "Vertical",
						Enable: false
					});
				});


				return Data.map(Row => (
					Row.slice(0, Action.Width)
				));
			}


			return Data;
		}
		case "SetHeight": {
			if (Action.Height > Data.length) {
				return [...Data, ...Array.from({length: Action.Height - Data.length}, () => (Array.from({length: Data[0].length}, () => (
					JSON.parse(JSON.stringify(InitialTileData))
				))))];
			}
			else if (Action.Height < Data.length) {
				Data[Action.Height - 1].forEach(_Tile => {
					Action.DataDispatch({
						Type: "Update-Wall",
						Position: [Data[Action.Height - 1].indexOf(_Tile), Action.Height - 1],
						Orientation: "Horizontal",
						Enable: false
					});
				});
				

				return Data.slice(0, Action.Height);
			}


			return Data;
		}
		case "Update-Tile": {
			const New_Data = JSON.parse(JSON.stringify(Data));

			New_Data[Action.Position[1]][Action.Position[0]].Tile.Exists = Action.Enable;
			
			if (!Action.Enable && New_Data[Action.Position[1]][Action.Position[0]].Room.Exists) {
				Action.DataDispatch({
					Type: "Update-Room",
					DataDispatch: Action.DataDispatch,
					Position: Action.Position,
					Enable: false
				});
			}


			return New_Data;
		}
		case "Update-Room": {
			const New_Data = JSON.parse(JSON.stringify(Data));

			New_Data[Action.Position[1]][Action.Position[0]].Room.Exists = Action.Enable;

			if (!Action.Enable) {
				Action.DataDispatch({
					Type: "Update-Entity",
					Position: Action.Position,
					Entity: null
				});

				ConnectionOrder.forEach(_Connection => {
					Action.DataDispatch({
						Type: "Update-Connection",
						Position: Action.Position,
						Orientation: _Connection.Direction,
						Enable: false,
						Locked_By: null
					});
				});
			}


			return New_Data;
		}
		case "Update-Entity": {
			const New_Data = JSON.parse(JSON.stringify(Data));

			New_Data[Action.Position[1]][Action.Position[0]].Room.Entity = Action.Entity;


			return New_Data;
		}
		case "Update-Wall": {
			const New_Data = JSON.parse(JSON.stringify(Data));

			if (Action.Orientation === "Horizontal") {
				New_Data[Action.Position[1]][Action.Position[0]].Tile.Has_Bottom_Wall = Action.Enable;
			}
			else if (Action.Orientation === "Vertical") {
				New_Data[Action.Position[1]][Action.Position[0]].Tile.Has_Right_Wall = Action.Enable;
			}


			return New_Data;
		}
		case "Update-Connection": {
			const New_Data = JSON.parse(JSON.stringify(Data));

			New_Data[Action.Position[1]][Action.Position[0]].Room.Connections[Action.Orientation].Exists = Action.Enable;
			New_Data[Action.Position[1]][Action.Position[0]].Room.Connections[Action.Orientation].Locked_By = Action.Locked_By;


			return New_Data;
		}

		default: {
			throw Error("Unknown action: " + Action.Type);
		}
	}
}



// Main component
export default function Editor({ params }) {
	const [_Dimensions, _DimensionsDispatch] = useReducer(DimensionsReducer, InitialDimensions);
	const [_Data, _DataDispatch] = useReducer(DataReducer, InitialData);
	const { lang } = use(params);
	const [Dict, setDict] = useState(null);
	
	
	useEffect(() => {
		async function load() {
			try {
			const res = await fetch(`/locales/${lang}/common.json`);
			const json = await res.json();
			setDict(json);
			} catch (err) {
			console.error("Failed to load language JSON", err);
			}
		}

		load();
	  }, [lang]);

	const Style = {
		backgroundColor: `var(--middleground)`
	};

	return (
		<>
			<DictionaryContext value={Dict}>
			<DimensionsContext value={_Dimensions}>
			<DimensionsDispatchContext value={_DimensionsDispatch}>
			<DataContext value={_Data}>
			<DataDispatchContext value={_DataDispatch}>
				<div className="h-screen overflow-auto grid md:grid-cols-8 md:grid-rows-1">
					<div className="md:col-span-5 md:ml-4">
						<Layout />
					</div>
					<div className="md:col-span-3 md:ml-4 shadow-lg backdrop-blur-md" style={Style}>
						<Menu lang={lang} />
					</div>
				</div>
			</DataDispatchContext>
			</DataContext>
			</DimensionsDispatchContext>
			</DimensionsContext>
			</DictionaryContext>
			<ChatAssistant Dict={Dict}/>
		</>
	);
}


// Layout
function Layout() {
	const _Dimensions = useContext(DimensionsContext);
	const _Data = useContext(DataContext);
	
	const Style = {
		gridTemplateColumns: `repeat(${_Dimensions[0]}, 80px)`,
		gridTemplateRows: `repeat(${_Dimensions[1]}, 80px)`
	};


	return (
		<>
			<div className="flex justify-center items-center h-full">
				<div style={Style} className="grid justify-center p-4 gap-4">
					{_Data.map((Row, RowIndex) => (
						Row.map((Data, ColIndex) => (
							<Tile key={[ColIndex, RowIndex]} Data={Data} Position={[ColIndex, RowIndex]} />
						))
					))}
				</div>
			</div>
		</>
	);
}


// Tile
function Tile({ Data, Position }) {
	const _Dimensions = useContext(DimensionsContext);
	const _DataDispatch = useContext(DataDispatchContext);

	const No_Tile_Style = {
		backgroundColor: `#ff808040`
	};
	const No_Room_Style = {
		backgroundColor: `#00000000`
	};


	function HandleClick() {
		_DataDispatch({
			Type: Data.Tile.Exists ? "Update-Room" : "Update-Tile",
			DataDispatch: _DataDispatch,
			Position: Position,
			Enable: true
		});
	}


	return (
		<>
			<div className="relative">
				{Data.Tile.Exists && Data.Room.Exists ?
					<Room Data={Data} Position={Position}/> :
					<button className="w-full h-full cursor-pointer" onClick={HandleClick} style={Data.Tile.Exists ? No_Room_Style : No_Tile_Style}/>
				}
				{Position[1] < _Dimensions[1] - 1 ?
					<div className="absolute top-1/2 left-1/2 pointer-events-none w-full h-full -translate-x-1/2 translate-y-10.5">
						<Wall Data={Data} Position={Position} Orientation="Horizontal" />
					</div> :
					null
				}
				{Position[0] < _Dimensions[0] - 1 ?
					<div className="absolute top-1/2 left-1/2 pointer-events-none w-full h-full translate-x-2 -translate-y-1.5">
						<Wall Data={Data} Position={Position} Orientation="Vertical" />
					</div> :
					null
				}
			</div>
		</>
	);
}


// Wall
function Wall({ Data, Position, Orientation }) {
	const _DataDispatch = useContext(DataDispatchContext);


	function HandleClick() {
		_DataDispatch({
			Type: "Update-Wall",
			Position: Position,
			Orientation: Orientation,
			Enable: !((Orientation === "Horizontal" && Data.Tile.Has_Bottom_Wall) || (Orientation === "Vertical" && Data.Tile.Has_Right_Wall))
		});
	}


	return (
		<>
			{Orientation === "Horizontal" ?
				<img className={Data.Tile.Has_Bottom_Wall ? "pixel-art py-1 pointer-events-auto cursor-pointer" : "pixel-art py-1 opacity-10 hover:opacity-50 pointer-events-auto cursor-pointer"}
					src="/Editor/Wall.png"
					alt="Wall"
					onClick={HandleClick}
				/> :
				null
			}
			{Orientation === "Vertical" ?
				<img className={Data.Tile.Has_Right_Wall ? "pixel-art py-1 rotate-90 pointer-events-auto cursor-pointer" : "pixel-art py-1 rotate-90 opacity-10 hover:opacity-50 pointer-events-auto cursor-pointer"}
					src="/Editor/Wall.png"
					alt="Wall"
					onClick={HandleClick}
				/> :
				null
			}
		</>
	);
}


// Room
function Room({ Data, Position }) {
	const _DataDispatch = useContext(DataDispatchContext);


	function HandleClick() {
		if (Data.Room.Entity === null || EntityOrder.findIndex(_Element => _Element.Name === Data.Room.Entity) < EntityOrder.length - 1) {
			_DataDispatch({
				Type: "Update-Entity",
				Position: Position,
				Entity: EntityOrder[EntityOrder.findIndex(_Element => _Element.Name === Data.Room.Entity) + 1].Name
			});
		}
		else {
			_DataDispatch({
				Type: "Update-Entity",
				Position: Position,
				Entity: null
			});

			_DataDispatch({
				Type: "Update-Tile",
				DataDispatch: _DataDispatch,
				Position: Position,
				Enable: false
			});
		}
	}


	return (
		<>
			<div className="relative">
				<img className="pixel-art peer absolute top-1/2 left-1/2 -translate-x-4 -translate-y-5.5 z-20 opacity-0 hover:opacity-50 cursor-pointer"
					src={EntityOrder.findIndex(_Element => _Element.Name === Data.Room.Entity) !== EntityOrder.length - 1 ? EntityOrder[EntityOrder.findIndex(_Element => _Element.Name === Data.Room.Entity) + 1].Path : "/Editor/Room/Empty.png"}
					alt={EntityOrder.findIndex(_Element => _Element.Name === Data.Room.Entity) !== EntityOrder.length - 1 ? EntityOrder[EntityOrder.findIndex(_Element => _Element.Name === Data.Room.Entity) + 1].Name : ""} onClick={HandleClick}
				/>	
				{Data.Room.Entity ?
					<img className="pixel-art absolute top-1/2 left-1/2 -translate-x-4 -translate-y-5.5 z-10 peer-hover:opacity-0"
						src={EntityOrder.find(_Element => _Element.Name === Data.Room.Entity).Path}
						alt={Data.Room.Entity ? Data.Room.Entity : ""}
					/> :
					null
				}
				<div className={EntityOrder.findIndex(_Element => _Element.Name === Data.Room.Entity) === EntityOrder.length - 1 ? "peer-hover:opacity-50" : ""}>
					<img className="pixel-art"
						src="/Editor/Room/Room.png"
						alt="Room"
					/>
					<Connection Data={Data} Position={Position} Orientation="Left" />
					<Connection Data={Data} Position={Position} Orientation="Right" />
					<Connection Data={Data} Position={Position} Orientation="Up" />
					<Connection Data={Data} Position={Position} Orientation="Down" />
				</div>
			</div>
		</>
	);
}


// Connection
function Connection({ Data, Position, Orientation }) {
	const _DataDispatch = useContext(DataDispatchContext);


	function HandleClick() {
		_DataDispatch({
			Type: "Update-Connection",
			Position: Position,
			Orientation: Orientation,
			Enable: !Data.Room.Connections[Orientation].Exists || Data.Room.Connections[Orientation].Locked_By === null,
			Locked_By: Data.Room.Connections[Orientation].Exists && Data.Room.Connections[Orientation].Locked_By === null ? "Key" : null
		});
	}


	return (
		<>
			<img className={Data.Room.Connections[Orientation].Exists ? "pixel-art absolute cursor-pointer " + ConnectionOrder.find(_Element => _Element.Direction === Orientation).TransformClasses : "pixel-art absolute cursor-pointer opacity-0 hover:opacity-50 " + ConnectionOrder.find(_Element => _Element.Direction === Orientation).TransformClasses}
				src={Data.Room.Connections[Orientation].Locked_By === "Key" ? "/Editor/Room/Connections/Key-Locked.png" : "/Editor/Room/Connections/Unlocked.png"}
				alt="Connection"
				onClick={HandleClick}
			/>
			{Orientation === "Down" && Data.Room.Connections[Orientation].Exists ?
				<img className={Data.Room.Connections[Orientation].Exists ? "pixel-art absolute bottom-1.5 left-1/2 -translate-x-2.5" : "pixel-art absolute opacity-0 bottom-1.5 left-1/2 -translate-x-2.5"}
					src={Data.Room.Connections[Orientation].Locked_By === "Key" ? "/Editor/Room/Connections/Key-Locked-Down.png" : "/Editor/Room/Connections/Unlocked-Down.png"}
					alt="Connection-Down"
				/> :
				null
			}
		</>
	);
}


// UI with all menus
function Menu({ lang }) {
	const _DictionaryContext = useContext(DictionaryContext);


	
	const { data: local_session } = useSession();
	// console.log("SESSION:", local_session);

	return (
		<>
			<div className="flex justify-center items-center h-full">
				<div className="grid grid-cols-1 grid-rows-2 p-4 gap-8 w-full max-md:h-full max-md:relative">
					<div>
						<DimensionInputs />
					</div>
					<div className="grid md:grid-cols-1 md:grid-rows-2 gap-4 max-md:grid-cols-2 max-md:grid-rows-1">
						{(local_session||null) && (
						<button className="py-4 rounded-xl font-semibold border border-[var(--foreground)]/30
    					bg-[var(--foreground)]/10 text-[var(--foreground)] shadow-[0_2px_6px_rgba(0,0,0,0.15)]
    					hover:bg-[var(--foreground)] hover:text-[var(--background)]
    					hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-all duration-200 cursor-pointer"> 
						{_DictionaryContext !== null ? _DictionaryContext.Editor.Upload : "..."}{_DictionaryContext !== null ? _DictionaryContext.Editor.Upload : "..."}</button>
						)}
						<DownloadButton />
					</div>
					<a className="flex justify-center items-center px-4 py-2 rounded-xl font-semibold border border-[var(--foreground)]/30
          				bg-[var(--foreground)]/10 text-[var(--foreground)] shadow-[0_2px_6px_rgba(0,0,0,0.15)]
          				hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)]
          				transition-all duration-200 max-md:relative max-md:static max-md:mb-4 md:absolute md:top-4 md:right-4" href={"/" + lang}>
						{_DictionaryContext !== null ? _DictionaryContext.Editor.Back : "..."}
					</a>
				</div>
			</div>
		</>
	);
}


// Dimension controls
function DimensionInputs() {
	const _DictionaryContext = useContext(DictionaryContext);
	const _Dimensions = useContext(DimensionsContext);
	const _DimensionsDispatch = useContext(DimensionsDispatchContext);
	const _DataDispatch = useContext(DataDispatchContext);


	function IncreaseWidth() {
		_DimensionsDispatch({
			Type: "SetWidth",
			DataDispatch: _DataDispatch,
			Width: _Dimensions[0] + 1
		});
	}

	function DecreaseWidth() {
		_DimensionsDispatch({
			Type: "SetWidth",
			DataDispatch: _DataDispatch,
			Width: _Dimensions[0] - 1
		});
	}

	function IncreaseHeight() {
		_DimensionsDispatch({
			Type: "SetHeight",
			DataDispatch: _DataDispatch,
			Height: _Dimensions[1] + 1
		});
	}

	function DecreaseHeight() {
		_DimensionsDispatch({
			Type: "SetHeight",
			DataDispatch: _DataDispatch,
			Height: _Dimensions[1] - 1
		});
	}


	return (
		<>
			<div className="col-span-6">
				<div className="grid grid-cols-9 grid-rows-2 gap-1">
					<p className="col-span-4 md:col-span-4 text-center">{_DictionaryContext !== null ? _DictionaryContext.Editor.Width : "..."}</p>
					<div className="col-span-5 grid grid-cols-4 grid-rows-1 text-center">
						<button onClick={DecreaseWidth} className="py-4 rounded-xl font-semibold border border-[var(--foreground)]/30
    					bg-[var(--foreground)]/10 text-[var(--foreground)] shadow-[0_2px_6px_rgba(0,0,0,0.15)]
    					hover:bg-[var(--foreground)] hover:text-[var(--background)]
    					hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-all duration-200 cursor-pointer">-</button>
						<p className="col-span-2 py-4 font-semibold border border-[var(--foreground)]/30
    					bg-[var(--foreground)]/10 text-[var(--foreground)] transition-all">{_Dimensions[0]}</p>
						<button onClick={IncreaseWidth} className="py-4 rounded-xl font-semibold border border-[var(--foreground)]/30
    					bg-[var(--foreground)]/10 text-[var(--foreground)] shadow-[0_2px_6px_rgba(0,0,0,0.15)]
    					hover:bg-[var(--foreground)] hover:text-[var(--background)]
    					hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-all duration-200 cursor-pointer">+</button>
					</div>
					<p className="col-span-4 md:col-span-4 text-center">{_DictionaryContext !== null ? _DictionaryContext.Editor.Height : "..."}</p>
					<div className="col-span-5 grid grid-cols-4 grid-rows-1 text-center">
						<button onClick={DecreaseHeight} className="py-4 rounded-xl font-semibold border border-[var(--foreground)]/30
    					bg-[var(--foreground)]/10 text-[var(--foreground)] shadow-[0_2px_6px_rgba(0,0,0,0.15)]
    					hover:bg-[var(--foreground)] hover:text-[var(--background)]
    					hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-all duration-200 cursor-pointer">-</button>
						<p className="col-span-2 py-4 font-semibold border border-[var(--foreground)]/30
    					bg-[var(--foreground)]/10 text-[var(--foreground)] transition-all">{_Dimensions[1]}</p>
						<button onClick={IncreaseHeight} className="py-4 rounded-xl font-semibold border border-[var(--foreground)]/30
    					bg-[var(--foreground)]/10 text-[var(--foreground)] shadow-[0_2px_6px_rgba(0,0,0,0.15)]
    					hover:bg-[var(--foreground)] hover:text-[var(--background)]
    					hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-all duration-200 cursor-pointer">+</button>
					</div>
				</div>
			</div>
		</>
	);
}


// Download button
function DownloadButton() {
	const _Data = useContext(DataContext);
	const _DictionaryContext = useContext(DictionaryContext);


	function HandleClick() {
		const _JSON = JSON.stringify(_Data, null, 4);
		const _BLOB = new Blob([_JSON], { type: "application/json" });
		const _URL = URL.createObjectURL(_BLOB);

		const a = document.createElement("a");
		a.href = _URL;
		a.download = "Level.json";
		document.body.appendChild(a);
		a.click()
		document.body.removeChild(a);
		URL.revokeObjectURL(_URL);
	}


	return (
		<>
			<button className="py-4 rounded-xl font-semibold border border-[var(--foreground)]/30
    					bg-[var(--foreground)]/10 text-[var(--foreground)] shadow-[0_2px_6px_rgba(0,0,0,0.15)]
    					hover:bg-[var(--foreground)] hover:text-[var(--background)]
    					hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-all duration-200 cursor-pointer"
						onClick={HandleClick}>{_DictionaryContext !== null ? _DictionaryContext.Editor.Download : "..."}</button>
		</>
	);
}