<!DOCTYPE html>
<html>
<head>
<title>{{title}} Form</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
</head>
<body>
<div class='container'>
<form id="{{title}}_form">
<h1>{{title}}</h1>
{{#each properties}}
  <div class="form-group">
      <label for="{{name}}">{{ui.label}}</label>
      {{#switch ui.inputType}}
        {{#case 'text'}}
        <input type="text" name="{{name}}" id="{{name}}_input">
        {{/case}}
        {{#case 'email'}}
        <input type="email" name="{{name}}" id="{{name}}_input">
        {{/case}}
        {{#case 'password'}}
        <input type="password" name="{{name}}" id="{{name}}_input">
        {{/case}}
        {{#case 'select'}}
        <select name="{{name}}" id="{{name}}_input">
            {{#each ui.options}}
            <option value="{{value}}">{{label}}</option>
            {{/each}}
        </select>
        {{/case}}
        {{#case 'textarea'}}
        <textarea name="{{name}}" id="{{name}}_input"></textarea>
        {{/case}}
        {{#case 'radio'}}
        {{#each ui.options}}
        <label for="{{value_input}}">{{label}}</label>
        <input name="{{../name}}" id="{{value}}_input" value="{{value}}">
        {{/each}}
        {{/case}}
      {{/switch}}
  </div>
  {{/each}}
    <div class='form-group'>
        <button class='btn btn-primary'>Submit</button>
    </div>
</form>
</div>
<script>

$('#{{title}}_form').on('submit', function(e){
    e.preventDefault();
    data = JSON.stringify( $('#{{title}}_form').serializeArray());
    console.log(data)
    
})


</script>
</body>
</body>
</html>