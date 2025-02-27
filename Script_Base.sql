-- Insertar datos en la tabla 'empresa'
INSERT INTO public.empresa (id_empresa, nombre, ruc, direccion, telefono, email_contacto, sector, "Estado") VALUES
(1, 'Comercializadora ABC', 123456789, 'Av. Principal 123, Quito', '0991234567', 'contacto@abc.com', 'Comercio', true),
(2, 'Distribuidora XYZ', 987654321, 'Calle Secundaria 456, Guayaquil', '0987654321', 'info@xyz.com', 'Distribución', true);

-- Insertar datos en la tabla 'categoria'
INSERT INTO public.categoria (id_categoria, nombre, descripcion) VALUES
(1, 'Electrónica', 'Productos electrónicos y gadgets'),
(2, 'Ropa', 'Vestimenta de todo tipo'),
(3, 'Alimentos', 'Productos alimenticios no perecibles');

-- Insertar datos en la tabla 'proveedor'
INSERT INTO public.proveedor (id_proveedor, nombre, contacto, telefono, email, direccion) VALUES
(1, 'Proveedor Tech', 'Juan Pérez', '0998765432', 'juan@tech.com', 'Calle Tech 789, Quito'),
(2, 'Ropa S.A.', 'María Gómez', '0981234567', 'maria@ropasa.com', 'Av. Moda 101, Guayaquil');

-- Insertar datos en la tabla 'rol'
INSERT INTO public.rol (id_rol, nombre, descripcion) VALUES
(1, 'Administrador', 'Acceso completo al sistema'),
(2, 'Vendedor', 'Gestión de pedidos y ventas'),
(3, 'Almacenero', 'Control de inventario');

-- Insertar datos en la tabla 'usuario'
INSERT INTO public.usuario (id_usuario, nombre_completo, email, telefono, password_hash, "idEmpresaIdEmpresa") VALUES
(1, 'Carlos López', 'carlos@abc.com', '0995551234', '$2b$10$hashedpassword123', 1),
(2, 'Ana Martínez', 'ana@xyz.com', '0984445678', '$2b$10$hashedpassword456', 2);

-- Insertar datos en la tabla 'usuario_rol'
INSERT INTO public.usuario_rol (id_usuario_rol, "idUsuarioIdUsuario", "idRolIdRol") VALUES
(1, 1, 1), -- Carlos como Administrador
(2, 2, 2); -- Ana como Vendedora

-- Insertar datos en la tabla 'producto'
INSERT INTO public.producto (id_producto, codigo_barras, nombre, descripcion, precio_compra, precio_venta, stock_minimo, stock_maximo, "idCategoriaIdCategoria", "idEmpresaIdEmpresa", "idProveedorIdProveedor") VALUES
(1, '1234567890123', 'Smartphone X1', 'Teléfono de última generación', 200, 300, 5, 50, 1, 1, 1),
(2, '9876543210987', 'Camiseta Básica', 'Camiseta de algodón', 5, 10, 10, 100, 2, 2, 2),
(3, '4567891234567', 'Arroz 1kg', 'Arroz blanco de grano largo', 1, 2, 20, 200, 3, 1, NULL);

-- Insertar datos en la tabla 'inventario'
INSERT INTO public.inventario (id_inventario, "idEmpresaIdEmpresa") VALUES
(1, 1), -- Inventario de Comercializadora ABC
(2, 2); -- Inventario de Distribuidora XYZ

-- Insertar datos en la tabla 'pedido'
INSERT INTO public.pedido (id_pedido, fecha_entrega, estado, "idEmpresaIdEmpresa") VALUES
(1, '2025-03-01 10:00:00', 'Pendiente', 1),
(2, '2025-03-02 15:00:00', 'Completado', 2);

-- Insertar datos en la tabla 'detalle_pedido'
INSERT INTO public.detalle_pedido (id_detalle_pedido, cantidad, precio_unitario, "idPedidoIdPedido", "idProductoIdProducto") VALUES
(1, 2, 300.00, 1, 1), -- 2 Smartphone X1 en el pedido 1
(2, 10, 10.00, 2, 2); -- 10 Camisetas Básicas en el pedido 2

-- Insertar datos en la tabla 'alerta_stock'
INSERT INTO public.alerta_stock (id_alerta, nivel_minimo, "idProductoIdProducto") VALUES
(1, 5, 1), -- Alerta para Smartphone X1
(2, 15, 2); -- Alerta para Camiseta Básica

-- Insertar datos en la tabla 'movimiento_inventario'
INSERT INTO public.movimiento_inventario (id_movimiento, tipo_movimiento, cantidad, fecha_movimiento, motivo, costo_unitario, ubicacion, "idProductoIdProducto", "idUsuarioIdUsuario") VALUES
(1, 'Entrada', 10, '2025-02-25 09:00:00', 'Recepción de proveedor', 200, 'Bodega A', 1, 1),
(2, 'Salida', 5, '2025-02-25 14:00:00', 'Venta', 5, 'Bodega B', 2, 2);

-- Insertar datos en la tabla 'reporte'
INSERT INTO public.reporte (id_reporte, tipo, archivo_pdf, "idEmpresaIdEmpresa", "idUsuarioIdUsuario") VALUES
(1, 'Inventario', '/reportes/inv_2025_02_25.pdf', 1, 1),
(2, 'Ventas', '/reportes/ventas_2025_02_25.pdf', 2, 2);