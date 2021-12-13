import React from "react"
import shortid from "shortid"

function App() {
	const [tarea, setTarea] = React.useState("")
	const [tareas, setTareas] = React.useState([])
	const [modoEdicion, setModoEdicion] = React.useState(false)
	const [id, setId] = React.useState("")
	const [error, setError] = React.useState(null)


	const agregarTarea = (e) => {
		e.preventDefault()

		if (!tarea.trim()) {
			console.log("Elemento vacío")
			setError("Escriba algo por favor...")
			return
		}
		console.log(tarea)

		setTareas([
			...tareas,
			{ id: shortid.generate(), nombreTarea: tarea },
			// shortid.generate() genera ids cortos automaticamente
		])

		setTarea("")
		setError(null) // Cuando agregarTarea termine su ejecución, que vuelva a null
	}

	const eliminarTarea = id => {
		console.log(id)

		const arrayFiltrado = tareas.filter(item => item.id !== id)
		/* Se genera un array filtrado para recorrer las tareas el cual
		irá preguntando si el item.id es distinto al id que le estamos
		mandando (id), en el caso de ser iguales, lo va a agregar a 
		nuestro arrayFiltrado, de lo contrario lo va a excluir. */
		setTareas(arrayFiltrado) 
		// setTareas ahora será el Array sin la tarea eliminada.
	}

	const editar = item => {
		console.log(item)
		setModoEdicion(true)
		setTarea(item.nombreTarea)
		setId(item.id) // Se le asigna el id de la tarea a editar.
	}

	const editarTarea = e => {
		e.preventDefault()

		if (!tarea.trim()) {
			console.log("Elemento vacío")
			return
		}

		const arrayEditado = tareas.map(item => item.id === id ? {id:id, nombreTarea:tarea} : item)
		/* Se crea un arreglo que realice un map de tareas en donde toma un item y va a ir 
		devolviendo los elementos según la condición que coloquemos: si item.id es igual
		a id que nosotros estamos modificando (guardado en setId(item.id)), que me devuelva
		un objeto que va a ser el {id, nombreTarea: tarea} (que me devuelva el objeto 
		editado.)  
		De lo contrario si item.id no es igual al id que estamos modificando, no 
		necesitamos modificar el resto de las tareas, por lo que devolvemos el item que 
		son cada uno de nuestros elementos */

		//Una vez que tenemos nuestro array editado, vamos a guardarlo:
		setTareas(arrayEditado)
		setModoEdicion(false)  /* Una vez editada la tarea, debemos pasar el modoEdicion 
								a true. */
		setTarea("") // La tarea la debemos pasar a un string vacío.
		setId("") // El id lo debemos pasar a un string vacío.
		setError(null) // Cuando editarTarea termine su ejecución, que vuelva a null
	}


	return (
		<div className="container mt-5">
			<h1 className="text-center">CRUD Simple</h1>
			<hr />
			<div className="row">
				<div className="col-8">
					<h4 className="text-center">Lista de Tareas</h4>
					<ul className="list-group">
						{/* Listar Tareas */}
						{
							tareas.length === 0 ? (
								<li className="list-group-item">No hay tareas</li>
							) : (
								tareas.map((item) => ( 
								/* Gerane una lista a medida que se vayan creando las tareas */
									<li className="list-group-item" key={item.id}> {/* Se le da un id */}
										<span className="lead">{item.nombreTarea}</span>
										{/* Botón Eliminar Tarea */}
										<button 
											className="btn btn-danger btn-sm float-right mx-2"
											onClick={() => eliminarTarea(item.id)}
										>
											{/* Para eliminar una tarea se necesita el ID para
											relacionar el botón con la función de eliminarTarea */}
											Eliminar
										</button>
										{/* Botón Editar Tarea */}
										<button 
											className="btn btn-warning btn-sm float-right"
											onClick={() => editar(item)}
										> 
											{/* al editar se le debe pasar el item entero para que reciba el 
											parametro tanto del id como del nombreTarea */}
											Editar
										</button>
									</li>
								))
							)
						}
					</ul>
				</div>
				<div className="col-4">
					<h4 className="text-center">
						{
							/* evaluar ? exito : respuesta_negativa */
							modoEdicion ? "Editar Tarea" : "Agregar Tarea"
							/* Como el modoEdicion es falso, mostrará inicialmente
							"Agregar Tarea", pero al apretar el botón editar,
							el modoEdicion pasa a true, por lo que se cambia el
							título a "Editar Tarea". */
						}
					</h4>
					<form onSubmit={modoEdicion ? editarTarea : agregarTarea}>

						{
							error ? <spam className="text-danger">{error}</spam> : null
							/* Cuando error tenga algo, vamos a pintar un spam que muestre
							el error que contiene, de lo contrario si es null, que
							no muestre nada. */
						}

						<input 
							type="text" 
							className="form-control mb-2" 
							placeholder="Ingrese Tarea" 
							onChange={(e) => setTarea(e.target.value)} 
							value={tarea} 
						/>
						{	
							// evaluar ? (exito) : (respuesta_negativa)
							modoEdicion ? (
								<button className="btn btn-warning btn-block" type="submit">
									Editar
								</button>
							) : (
								<button className="btn btn-dark btn-block" type="submit">
									Agregar
								</button>
							)
						}
					</form>
				</div>
			</div>
		</div>
	)
}

export default App
