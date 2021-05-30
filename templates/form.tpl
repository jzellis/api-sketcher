<form id="form-{{title}}">
	<h2>{{title}}</h2>
	{{#each properties}}
		<fieldset class="form-group">
			<label for-"{{name}}">{{name}}</label>
			<input type="text" name="{{name}}" class="form-control" value="{{default}}">
		</fieldset>

	{{/each}}
</form>