Para app funcionar é necessário:

1. Habilitar o CORS dentro do **Bucket** [get, put]
2. Pegar o Account ID tela inicial ou em `settings>general` (R2_ACCOUNT_ID)
3. Ainda na pagina de **Overview** acessar o **API Tokens** [Manage] e pegar o `Access Key ID` e `Secret Access Key` (R2_ACCESS_KEY_ID e R2_SECRET_ACCESS_KEY)
4. Dentro do **Bucket** acessar `settings > Public Development URL` e ativar. (BUCKET_PUBLIC_URL)

---

- Adicione um valor a `JWT_SECRET=` para ser gerado o token de auth

> Assim como ter o docker instalado para executar o mongodb (via compose) `docker compose up`
