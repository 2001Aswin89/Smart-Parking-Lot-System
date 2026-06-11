"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotController = void 0;
class SpotController {
    constructor(spotRepository) {
        this.spotRepository = spotRepository;
        this.getAllSpots = async (req, res, next) => {
            try {
                const spots = await this.spotRepository.findAll();
                res.status(200).json({
                    success: true,
                    data: spots,
                });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.SpotController = SpotController;
