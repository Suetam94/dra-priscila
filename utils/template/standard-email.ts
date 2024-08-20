const year = new Date().getFullYear()

export default `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
      body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
      }
      .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .email-header {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #dddddd;
      }
      .email-header h1 {
          font-size: 24px;
          color: #333333;
      }
      .email-body {
          padding: 20px;
          color: #555555;
          line-height: 1.6;
      }
      .email-body h2 {
          font-size: 20px;
          margin-bottom: 10px;
          color: #333333;
      }
      .email-body p {
          margin: 0 0 10px;
      }
      .email-footer {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #dddddd;
          color: #999999;
          font-size: 12px;
      }
  </style>
</head>
<body>
<div class="email-container">
  <div class="email-header">
    <h1>Contato Recebido</h1>
  </div>
  <div class="email-body">
    <h2>Olá, Dra. Priscila!</h2>
    <p>Recebemos uma mensagem com as seguintes informações:</p>
    <p><strong>Nome:</strong> {{name}}</p>
    <p><strong>Telefone:</strong> {{phone}}</p>
    <p><strong>Email:</strong> {{email}}</p>
    <p><strong>Mensagem:</strong> {{message}}</p>
  </div>
  <div class="email-footer">
    <p>&copy; ${year} Dra. Priscila Francisco. Todos os direitos reservados.</p>
  </div>
</div>
</body>
</html>`
