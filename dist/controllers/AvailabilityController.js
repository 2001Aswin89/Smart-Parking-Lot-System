"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityController = void 0;
class AvailabilityController {
    constructor(availabilityService) {
        this.availabilityService = availabilityService;
        this.getAvailability = async (_req, res, next) => {
            try {
                const availability = await this.availabilityService
                    .getAvailability();
                res.status(200).json({
                    success: true,
                    data: availability,
                });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.AvailabilityController = AvailabilityController;
