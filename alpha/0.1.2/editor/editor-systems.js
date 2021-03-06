
//	editor-systems.js

	(function(editor,keyboard,camera,cameraControls,entity_droplist){

		var interval;
		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

		const clock = new THREE.Clock();
		const keyCodes = keyboard.keyCodes;
		const modifiers = keyboard.modifiers;
		const LEFT=37, UP=38, RIGHT=39, DOWN=40;
		const A=65, D=68, E=69, F=70, G=71, H=72, 
			  Q=81, R=82, S=83, T=84, W=87, Y=89;

		function modifierIsDown(){
			return modifiers.alt   || modifiers.meta
				|| modifiers.shift || modifiers.ctrl; 
		}

	//	EditorScalingSystem.

		function EditorScalingSystem( dt ){

			if ( keyCodes[G] ) {
				editor.scale.x += dt;
				editor.scale.y += dt;
				editor.scale.z += dt;
			}

			else if ( keyCodes[F] ) {
				editor.scale.x -= dt;
				editor.scale.y -= dt;
				editor.scale.z -= dt;
			} 

		}

	//	EditorRotationSystem.

		function EditorRotationSystem( dt ){

			var rad = Math.max(dt, DEG2RAD);

		//	Rotation (local coordinates).
			keyCodes[W] && editor.rotateOnAxis( axisX,  rad );
			keyCodes[S] && editor.rotateOnAxis( axisX, -rad );
			keyCodes[A] && editor.rotateOnAxis( axisY, -rad );
			keyCodes[D] && editor.rotateOnAxis( axisY,  rad );

		//	Reset rotation.
			keyCodes[R] && editor.rotation.set(0,0,0);
			keyCodes[T] && editor.setRotationFromQuaternion(camera.quaternion);

		}

	//	EditorTranslationSystem.

		function EditorTranslationSystem( dt ){

			var UPDOWN = keyCodes[E] || keyCodes[Q];
			var ARROWS = keyCodes[LEFT] || keyCodes[UP] || keyCodes[RIGHT] || keyCodes[DOWN];

		//	Move up/down.

			UPDOWN && (function(up, down){

				var rad = 0;
				var keyboardFrontAngle = 0;
				var movementSpeed = Math.max(dt, 0.05);
				var cameraFrontAngle = cameraControls.phi;
				if ( up ) keyboardFrontAngle =  Math.PI/2;
				if (down) keyboardFrontAngle = -Math.PI/2;
				var direction = rad - cameraFrontAngle + keyboardFrontAngle;
				var directionOnAxisY = Math.sin(direction);
				var y = directionOnAxisY * movementSpeed;
				editor.position.y += y; 

			})( keyCodes[E], keyCodes[Q] );

		//	Move left/right/forwards/backward

			ARROWS && (function() {

				var rad = 8 * Math.PI/4;  // keyboard input.
				var movementSpeed = Math.max(dt, 0.05);
				var cameraFrontAngle = cameraControls.getFrontAngle();
				var keyboardFrontAngle = keyboard.frontAngle;
				var direction = rad - cameraFrontAngle + keyboardFrontAngle;
				var directionOnAxisX = -Math.sin(direction);
				var directionOnAxisZ = -Math.cos(direction);
				var x = directionOnAxisX * movementSpeed;
				var z = directionOnAxisZ * movementSpeed;
				editor.position.x += x; 
				editor.position.z += z;

			})();

		}

	//	Editor keyInput loop.

		(function update(){

			var dt = clock.getDelta();
			requestFrameID = requestAnimationFrame( update );

			if ( modifierIsDown() ) return;
			if ( !entity_droplist.value ) return;

			var SCALE  = keyCodes[F] || keyCodes[G];
			var ROTATE = keyCodes[W] || keyCodes[A] || keyCodes[S] || keyCodes[D] || keyCodes[R] || keyCodes[T];
			var MOVING = keyCodes[E] || keyCodes[Q] || keyCodes[LEFT] || keyCodes[UP] || keyCodes[RIGHT] || keyCodes[DOWN];

			SCALE && EditorScalingSystem( dt );
			ROTATE && EditorRotationSystem( dt );
			MOVING && EditorTranslationSystem( dt );

		})();

	})( 
		objectEditor, keyboard, camera, cameraControls, // editor, ...,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist") // entity_droplist.
	);
