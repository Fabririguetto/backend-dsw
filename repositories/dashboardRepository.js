const { getConnection } = require('../config/db');

class DashboardRepository {
    
    async getVentasMesPasado() {
        const connection = await getConnection();
        try {

            const ahora = new Date();
            const primerDiaMesPasado = new Date(ahora.getFullYear(), ahora.getMonth() - 1, 1);
            const ultimoDiaMesPasado = new Date(ahora.getFullYear(), ahora.getMonth(), 0);
            
            const fechaInicio = primerDiaMesPasado.toISOString().split('T')[0];
            const fechaFin = ultimoDiaMesPasado.toISOString().split('T')[0];
            
            // Contar ventas del mes pasado
            const [ventasResult] = await connection.execute(
                `SELECT COUNT(*) as total_ventas FROM ventas 
                WHERE DATE(fechaHoraVenta) BETWEEN ? AND ?`,
                [fechaInicio, fechaFin]
            );
            
            const [ingresosResult] = await connection.execute(
                `SELECT COALESCE(SUM(montoTotal), 0) as total_ingresos FROM ventas 
                WHERE DATE(fechaHoraVenta) BETWEEN ? AND ?`,
                [fechaInicio, fechaFin]
            );
            
            return {
                ventas: ventasResult[0].total_ventas,
                ingresos: parseFloat(ingresosResult[0].total_ingresos) || 0
            };
            
        } finally {
            if (connection) connection.release();
        }
    }
    
    async getProductosStockBajo() {
        const connection = await getConnection();
        try {

            const [pocoStock] = await connection.execute(
                `SELECT idProducto, articulo, descripcion, cantidad 
                FROM productos 
                WHERE cantidad > 0 AND cantidad < 5 
                ORDER BY cantidad ASC`
            );
            
            const [sinStock] = await connection.execute(
                `SELECT idProducto, articulo, descripcion, cantidad 
                FROM productos 
                WHERE cantidad = 0 `
            );
            
            return { pocoStock, sinStock };
            
        } finally {
            if (connection) connection.release();
        }
    }
    
    async getProductosMasVendidos() {
        const connection = await getConnection();
        try {
            const [productos] = await connection.execute(`
                SELECT p.idProducto, p.articulo, p.descripcion, 
                SUM(pv.cantidadVendida) as total_vendido
                FROM productoventa pv
                INNER JOIN productos p ON pv.idProducto = p.idProducto
                INNER JOIN ventas v ON pv.idVenta = v.idVenta
                WHERE v.fechaHoraVenta >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                GROUP BY p.idProducto, p.articulo, p.descripcion
                ORDER BY total_vendido DESC
                LIMIT 5
            `);
            
            return productos;
            
        } finally {
            if (connection) connection.release();
        }
    }
    
    async getTopVendedores() {
        const connection = await getConnection();
        try {
            const [vendedores] = await connection.execute(`
                SELECT e.DNI_CUIL as idEmpleado, e.nombre_apellidoEmp,
                    COUNT(v.idVenta) as total_ventas,
                    COALESCE(SUM(v.montoTotal), 0) as total_monto
                FROM ventas v
                INNER JOIN empleados e ON v.DNIEmpleado = e.DNI_CUIL
                WHERE v.fechaHoraVenta >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                GROUP BY e.DNI_CUIL, e.nombre_apellidoEmp
                ORDER BY total_ventas DESC
                LIMIT 3
            `);
            
            return vendedores;
            
        } finally {
            if (connection) connection.release();
        }
    }
    async getEstadisticasCompletas() {
        const [
            ventasMesPasado,
            productosStock,
            productosMasVendidos,
            topVendedores
        ] = await Promise.all([
            this.getVentasMesPasado(),
            this.getProductosStockBajo(),
            this.getProductosMasVendidos(),
            this.getTopVendedores()
        ]);
        
        return {
            ...ventasMesPasado,
            productosPocoStock: productosStock.pocoStock,
            productosSinStock: productosStock.sinStock,
            productosMasVendidos,
            topVendedores
        };
    }
}

module.exports = new DashboardRepository();