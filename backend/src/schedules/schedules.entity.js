"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Schedules = void 0;
var typeorm_1 = require("typeorm");
var date_audit_entity_1 = require("@entities/date-audit.entity");
var reservations_entity_1 = require("@reservations/reservations.entity");
var Schedules = /** @class */ (function (_super) {
    __extends(Schedules, _super);
    function Schedules() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Schedules.prototype, "id");
    __decorate([
        typeorm_1.ManyToOne(function (type) { return reservations_entity_1.Reservations; }, function (reservation) { return reservation.schedules; })
    ], Schedules.prototype, "reservation");
    __decorate([
        typeorm_1.Column()
    ], Schedules.prototype, "departure");
    __decorate([
        typeorm_1.Column()
    ], Schedules.prototype, "departureDate");
    __decorate([
        typeorm_1.Column('text', {
            array: true,
            nullable: true
        })
    ], Schedules.prototype, "stopover");
    __decorate([
        typeorm_1.Column()
    ], Schedules.prototype, "destination");
    __decorate([
        typeorm_1.Column()
    ], Schedules.prototype, "returnDate");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Schedules.prototype, "lastDestination");
    __decorate([
        typeorm_1.Column()
    ], Schedules.prototype, "distance");
    Schedules = __decorate([
        typeorm_1.Entity()
    ], Schedules);
    return Schedules;
}(date_audit_entity_1.DateAudit));
exports.Schedules = Schedules;
