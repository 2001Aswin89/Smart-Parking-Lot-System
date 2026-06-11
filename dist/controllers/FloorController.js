"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloorController = void 0;
class FloorController {
    constructor(floorRepository, floorService) {
        this.floorRepository = floorRepository;
        this.floorService = floorService;
        this.createFloor = async (req, res, next) => {
            try {
                const { floorNumber } = req.body;
                const existingFloor = await this.floorRepository.findByFloorNumber(floorNumber);
                if (existingFloor) {
                    return res.status(409).json({
                        success: false,
                        message: "Floor already exists",
                    });
                }
                const floor = await this.floorRepository.create({
                    floorNumber,
                });
                res.status(201).json({
                    success: true,
                    data: floor,
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.getFloors = async (req, res, next) => {
            try {
                const floors = await this.floorRepository.findAll();
                res.status(200).json({
                    success: true,
                    data: floors,
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.closeFloor = async (req, res, next) => {
            try {
                const floorNumber = Number(req.params.floorNumber);
                const floor = await this.floorService.closeFloor(floorNumber);
                res.status(200).json({
                    success: true,
                    message: "Floor closed successfully",
                    data: floor,
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.openFloor = async (req, res, next) => {
            try {
                const floorNumber = Number(req.params.floorNumber);
                const floor = await this.floorService.openFloor(floorNumber);
                res.status(200).json({
                    success: true,
                    message: "Floor opened successfully",
                    data: floor,
                });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.FloorController = FloorController;
