# Development
Pasos para levantar la app en desarrollo

1. Levantar la base de datos
```
docker compose up -d
```

2. Renombrar el .env.template a .env
3. Reemplazar las variables de entorno
4. Ejecutar el comando ``` npm i ```
5. Ejecutar el comando ``` npm run dev ```
6. Ejecutar estos comandos de prisma
```
npx prisma migrate dev
npx prisma generate
```
7. Ejecutar el SEED para [crear la base de datos local](localhost:3000/api/seed)

## Nota: 
__usuario:__ test1@gmail.com
__password.__ cisco

# Prisma commads
```
npx prisma init
npx prisma migrate dev  <--- Escribe en la base de datos
npx prisma db push      <--- Escribe en la base de datos sin pasar por migración ( no borra la tabla )
npx prisma db pull      <--- Crea el esquema de prisma desde la BD
npx prisma generate     <--- Genera el nuevo cliente de prisma
```