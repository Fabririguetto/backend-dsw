const dashboardRepository = require('../repositories/dashboardRepository');

class DashboardController {
    
    async getEstadisticas(req, res) {
        try {
            const estadisticas = await dashboardRepository.getEstadisticasCompletas();
            
            res.json(estadisticas);
            
        } catch (error) {
            console.error('Error en dashboard controller:', error);
            res.status(500).json({ 
                error: 'Error obteniendo estadísticas del dashboard',
                mensaje: error.message 
            });
        }
    }
}

module.exports = new DashboardController();