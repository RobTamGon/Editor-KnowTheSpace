"use client";


import { useReducer, createContext, useContext } from "react";


// Dimension size limits
const Min_Dimension_Size = 1;
const Max_Dimension_Size = 5;


// Initialize dimension contexts and default values
const InitialDimensions = [Min_Dimension_Size, Min_Dimension_Size];
const DimensionsContext = createContext(InitialDimensions);
const DimensionsDispatchContext = createContext(null);


// Manage dimensions
function dimensionsReducer(dimensions, action) {
	switch (action.type) {
		case "SetWidth": {
			return [Math.min(Math.max(action.width, Min_Dimension_Size), Max_Dimension_Size), dimensions[1]];
		}
		case "SetHeight": {
			return [dimensions[0], Math.min(Math.max(action.height, Min_Dimension_Size), Max_Dimension_Size)];
		}

		default: {
			throw Error("Acción desconocida: " + action.type);
		}
	}
}

// Main
export default function Editor() {
	const [dimensions, dispatch] = useReducer(dimensionsReducer, InitialDimensions);


	return (
		<>
			<DimensionsContext value={dimensions}>
			<DimensionsDispatchContext value={dispatch}>
				<div className="grid grid-cols-3 grid-rows-1">
					<div className="col-span-2">
						
					</div>
					<div className="col-span-1 grid grid-cols-1 grid-rows-2 gap-4 p-4">
						<Menu />
					</div>
				</div>
			</DimensionsDispatchContext>
			</DimensionsContext>
		</>
	);
}


// UI with all menus
function Menu() {
	return (
		<>
			<DimensionInputs />
		</>
	);
}


// Dimension controls
function DimensionInputs() {
	const _dimensions = useContext(DimensionsContext);
	const _dispatch = useContext(DimensionsDispatchContext);


	function IncreaseWidth() {
		_dispatch({
			type: "SetWidth",
			width: _dimensions[0] + 1
		});
	}

	function DecreaseWidth() {
		_dispatch({
			type: "SetWidth",
			width: _dimensions[0] - 1
		});
	}

	function IncreaseHeight() {
		_dispatch({
			type: "SetHeight",
			height: _dimensions[1] + 1
		});
	}

	function DecreaseHeight() {
		_dispatch({
			type: "SetHeight",
			height: _dimensions[1] - 1
		});
	}


	return (
		<>
			<div className="grid grid-cols-9 grid-rows-2 gap-1">
				<div className="col-span-2" />
				<p className="col-span-2">Ancho:</p>
				<div className="col-span-5 grid grid-cols-4 grid-rows-1 text-center">
					<button onClick={DecreaseWidth} className="col-span-1 border">-</button>
					<p className="col-span-2 border">{_dimensions[0]}</p>
					<button onClick={IncreaseWidth} className="col-span-1 border">+</button>
				</div>
				<div className="col-span-2" />
				<p className="col-span-2">Alto:</p>
				<div className="col-span-5 grid grid-cols-4 grid-rows-1 text-center">
					<button onClick={DecreaseHeight} className="col-span-1 border">-</button>
					<p className="col-span-2 border">{_dimensions[1]}</p>
					<button onClick={IncreaseHeight} className="col-span-1 border">+</button>
				</div>
			</div>
		</>
	);
}