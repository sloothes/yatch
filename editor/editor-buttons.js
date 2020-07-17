//	exit-edit-mode.js

	(function(exit_button,entity_droplist,exitEditMode){

		watch( exit_button, "onclick", function( prop, event, value ){

			 exitEditMode( entity_droplist );
		});

	})( 
		TabUI.Editor.tab.querySelector("div#editor-exit-mode"), // exit_button,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist"), // entity_droplist.
		exitEditMode // function.
	 ); 

//	reset-vectors.js

	(function( editor,reset_button,vector_w,vector_droplist ){

		watch( reset_button, "onclick", function( property, event, key ){
			debugMode && console.log({item:reset_button,event:event,key:key});

			switch ( key ) {
				case "position":
					editor.position.set(0,0,0);
				break;
				case "rotation":
					editor.rotation.set(0,0,0);
				break;
				case "scale":
					editor.scale.set(1,1,1);
				break;
				case "quaternion":
					editor.quaternion.set(0,0,0,1);
				break;
			}

		});

	})(
		objectEditor, // editor,
		TabUI.Editor.querySelector("div#editor-reset-button"), // reset_button,
	//	TabUI.Editor.querySelector("input#editor-vector-x-input"), // vector_x,
	//	TabUI.Editor.querySelector("input#editor-vector-y-input"), // vector_y,
	//	TabUI.Editor.querySelector("input#editor-vector-z-input"), // vector_z,
	//	TabUI.Editor.querySelector("input#editor-vector-w-input"), // vector_w,
		TabUI.Editor.querySelector("select#editor-vector-droplist") // vector_droplist.
	);
