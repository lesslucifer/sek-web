/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.RoomSettings = (function() {
    
        /**
         * Properties of a RoomSettings.
         * @exports IRoomSettings
         * @interface IRoomSettings
         * @property {number|null} [gameSpeed] RoomSettings gameSpeed
         */
    
        /**
         * Constructs a new RoomSettings.
         * @exports RoomSettings
         * @classdesc Represents a RoomSettings.
         * @implements IRoomSettings
         * @constructor
         * @param {IRoomSettings=} [properties] Properties to set
         */
        function RoomSettings(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * RoomSettings gameSpeed.
         * @member {number} gameSpeed
         * @memberof RoomSettings
         * @instance
         */
        RoomSettings.prototype.gameSpeed = 0;
    
        /**
         * Creates a new RoomSettings instance using the specified properties.
         * @function create
         * @memberof RoomSettings
         * @static
         * @param {IRoomSettings=} [properties] Properties to set
         * @returns {RoomSettings} RoomSettings instance
         */
        RoomSettings.create = function create(properties) {
            return new RoomSettings(properties);
        };
    
        /**
         * Encodes the specified RoomSettings message. Does not implicitly {@link RoomSettings.verify|verify} messages.
         * @function encode
         * @memberof RoomSettings
         * @static
         * @param {IRoomSettings} message RoomSettings message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomSettings.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameSpeed != null && Object.hasOwnProperty.call(message, "gameSpeed"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.gameSpeed);
            return writer;
        };
    
        /**
         * Encodes the specified RoomSettings message, length delimited. Does not implicitly {@link RoomSettings.verify|verify} messages.
         * @function encodeDelimited
         * @memberof RoomSettings
         * @static
         * @param {IRoomSettings} message RoomSettings message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomSettings.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a RoomSettings message from the specified reader or buffer.
         * @function decode
         * @memberof RoomSettings
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {RoomSettings} RoomSettings
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomSettings.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RoomSettings();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.gameSpeed = reader.uint32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a RoomSettings message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof RoomSettings
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {RoomSettings} RoomSettings
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomSettings.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a RoomSettings message.
         * @function verify
         * @memberof RoomSettings
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoomSettings.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameSpeed != null && message.hasOwnProperty("gameSpeed"))
                if (!$util.isInteger(message.gameSpeed))
                    return "gameSpeed: integer expected";
            return null;
        };
    
        /**
         * Creates a RoomSettings message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof RoomSettings
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {RoomSettings} RoomSettings
         */
        RoomSettings.fromObject = function fromObject(object) {
            if (object instanceof $root.RoomSettings)
                return object;
            var message = new $root.RoomSettings();
            if (object.gameSpeed != null)
                message.gameSpeed = object.gameSpeed >>> 0;
            return message;
        };
    
        /**
         * Creates a plain object from a RoomSettings message. Also converts values to other types if specified.
         * @function toObject
         * @memberof RoomSettings
         * @static
         * @param {RoomSettings} message RoomSettings
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoomSettings.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.gameSpeed = 0;
            if (message.gameSpeed != null && message.hasOwnProperty("gameSpeed"))
                object.gameSpeed = message.gameSpeed;
            return object;
        };
    
        /**
         * Converts this RoomSettings to JSON.
         * @function toJSON
         * @memberof RoomSettings
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoomSettings.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        /**
         * Gets the default type url for RoomSettings
         * @function getTypeUrl
         * @memberof RoomSettings
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RoomSettings.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/RoomSettings";
        };
    
        return RoomSettings;
    })();
    
    $root.RoomRequests = (function() {
    
        /**
         * Properties of a RoomRequests.
         * @exports IRoomRequests
         * @interface IRoomRequests
         * @property {boolean|null} [stop] RoomRequests stop
         * @property {IRoomSettings|null} [settings] RoomRequests settings
         * @property {Array.<string>|null} [leaveSeat] RoomRequests leaveSeat
         */
    
        /**
         * Constructs a new RoomRequests.
         * @exports RoomRequests
         * @classdesc Represents a RoomRequests.
         * @implements IRoomRequests
         * @constructor
         * @param {IRoomRequests=} [properties] Properties to set
         */
        function RoomRequests(properties) {
            this.leaveSeat = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * RoomRequests stop.
         * @member {boolean} stop
         * @memberof RoomRequests
         * @instance
         */
        RoomRequests.prototype.stop = false;
    
        /**
         * RoomRequests settings.
         * @member {IRoomSettings|null|undefined} settings
         * @memberof RoomRequests
         * @instance
         */
        RoomRequests.prototype.settings = null;
    
        /**
         * RoomRequests leaveSeat.
         * @member {Array.<string>} leaveSeat
         * @memberof RoomRequests
         * @instance
         */
        RoomRequests.prototype.leaveSeat = $util.emptyArray;
    
        /**
         * Creates a new RoomRequests instance using the specified properties.
         * @function create
         * @memberof RoomRequests
         * @static
         * @param {IRoomRequests=} [properties] Properties to set
         * @returns {RoomRequests} RoomRequests instance
         */
        RoomRequests.create = function create(properties) {
            return new RoomRequests(properties);
        };
    
        /**
         * Encodes the specified RoomRequests message. Does not implicitly {@link RoomRequests.verify|verify} messages.
         * @function encode
         * @memberof RoomRequests
         * @static
         * @param {IRoomRequests} message RoomRequests message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomRequests.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.stop != null && Object.hasOwnProperty.call(message, "stop"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.stop);
            if (message.settings != null && Object.hasOwnProperty.call(message, "settings"))
                $root.RoomSettings.encode(message.settings, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.leaveSeat != null && message.leaveSeat.length)
                for (var i = 0; i < message.leaveSeat.length; ++i)
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.leaveSeat[i]);
            return writer;
        };
    
        /**
         * Encodes the specified RoomRequests message, length delimited. Does not implicitly {@link RoomRequests.verify|verify} messages.
         * @function encodeDelimited
         * @memberof RoomRequests
         * @static
         * @param {IRoomRequests} message RoomRequests message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomRequests.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a RoomRequests message from the specified reader or buffer.
         * @function decode
         * @memberof RoomRequests
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {RoomRequests} RoomRequests
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomRequests.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RoomRequests();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.stop = reader.bool();
                        break;
                    }
                case 2: {
                        message.settings = $root.RoomSettings.decode(reader, reader.uint32());
                        break;
                    }
                case 3: {
                        if (!(message.leaveSeat && message.leaveSeat.length))
                            message.leaveSeat = [];
                        message.leaveSeat.push(reader.string());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a RoomRequests message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof RoomRequests
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {RoomRequests} RoomRequests
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomRequests.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a RoomRequests message.
         * @function verify
         * @memberof RoomRequests
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoomRequests.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.stop != null && message.hasOwnProperty("stop"))
                if (typeof message.stop !== "boolean")
                    return "stop: boolean expected";
            if (message.settings != null && message.hasOwnProperty("settings")) {
                var error = $root.RoomSettings.verify(message.settings);
                if (error)
                    return "settings." + error;
            }
            if (message.leaveSeat != null && message.hasOwnProperty("leaveSeat")) {
                if (!Array.isArray(message.leaveSeat))
                    return "leaveSeat: array expected";
                for (var i = 0; i < message.leaveSeat.length; ++i)
                    if (!$util.isString(message.leaveSeat[i]))
                        return "leaveSeat: string[] expected";
            }
            return null;
        };
    
        /**
         * Creates a RoomRequests message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof RoomRequests
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {RoomRequests} RoomRequests
         */
        RoomRequests.fromObject = function fromObject(object) {
            if (object instanceof $root.RoomRequests)
                return object;
            var message = new $root.RoomRequests();
            if (object.stop != null)
                message.stop = Boolean(object.stop);
            if (object.settings != null) {
                if (typeof object.settings !== "object")
                    throw TypeError(".RoomRequests.settings: object expected");
                message.settings = $root.RoomSettings.fromObject(object.settings);
            }
            if (object.leaveSeat) {
                if (!Array.isArray(object.leaveSeat))
                    throw TypeError(".RoomRequests.leaveSeat: array expected");
                message.leaveSeat = [];
                for (var i = 0; i < object.leaveSeat.length; ++i)
                    message.leaveSeat[i] = String(object.leaveSeat[i]);
            }
            return message;
        };
    
        /**
         * Creates a plain object from a RoomRequests message. Also converts values to other types if specified.
         * @function toObject
         * @memberof RoomRequests
         * @static
         * @param {RoomRequests} message RoomRequests
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoomRequests.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.leaveSeat = [];
            if (options.defaults) {
                object.stop = false;
                object.settings = null;
            }
            if (message.stop != null && message.hasOwnProperty("stop"))
                object.stop = message.stop;
            if (message.settings != null && message.hasOwnProperty("settings"))
                object.settings = $root.RoomSettings.toObject(message.settings, options);
            if (message.leaveSeat && message.leaveSeat.length) {
                object.leaveSeat = [];
                for (var j = 0; j < message.leaveSeat.length; ++j)
                    object.leaveSeat[j] = message.leaveSeat[j];
            }
            return object;
        };
    
        /**
         * Converts this RoomRequests to JSON.
         * @function toJSON
         * @memberof RoomRequests
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoomRequests.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        /**
         * Gets the default type url for RoomRequests
         * @function getTypeUrl
         * @memberof RoomRequests
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RoomRequests.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/RoomRequests";
        };
    
        return RoomRequests;
    })();
    
    $root.RoomPlayer = (function() {
    
        /**
         * Properties of a RoomPlayer.
         * @exports IRoomPlayer
         * @interface IRoomPlayer
         * @property {string|null} [id] RoomPlayer id
         * @property {string|null} [roomId] RoomPlayer roomId
         * @property {string|null} [name] RoomPlayer name
         * @property {string|null} [status] RoomPlayer status
         * @property {number|null} [score] RoomPlayer score
         */
    
        /**
         * Constructs a new RoomPlayer.
         * @exports RoomPlayer
         * @classdesc Represents a RoomPlayer.
         * @implements IRoomPlayer
         * @constructor
         * @param {IRoomPlayer=} [properties] Properties to set
         */
        function RoomPlayer(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * RoomPlayer id.
         * @member {string} id
         * @memberof RoomPlayer
         * @instance
         */
        RoomPlayer.prototype.id = "";
    
        /**
         * RoomPlayer roomId.
         * @member {string} roomId
         * @memberof RoomPlayer
         * @instance
         */
        RoomPlayer.prototype.roomId = "";
    
        /**
         * RoomPlayer name.
         * @member {string} name
         * @memberof RoomPlayer
         * @instance
         */
        RoomPlayer.prototype.name = "";
    
        /**
         * RoomPlayer status.
         * @member {string} status
         * @memberof RoomPlayer
         * @instance
         */
        RoomPlayer.prototype.status = "";
    
        /**
         * RoomPlayer score.
         * @member {number} score
         * @memberof RoomPlayer
         * @instance
         */
        RoomPlayer.prototype.score = 0;
    
        /**
         * Creates a new RoomPlayer instance using the specified properties.
         * @function create
         * @memberof RoomPlayer
         * @static
         * @param {IRoomPlayer=} [properties] Properties to set
         * @returns {RoomPlayer} RoomPlayer instance
         */
        RoomPlayer.create = function create(properties) {
            return new RoomPlayer(properties);
        };
    
        /**
         * Encodes the specified RoomPlayer message. Does not implicitly {@link RoomPlayer.verify|verify} messages.
         * @function encode
         * @memberof RoomPlayer
         * @static
         * @param {IRoomPlayer} message RoomPlayer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomPlayer.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.roomId);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.status);
            if (message.score != null && Object.hasOwnProperty.call(message, "score"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.score);
            return writer;
        };
    
        /**
         * Encodes the specified RoomPlayer message, length delimited. Does not implicitly {@link RoomPlayer.verify|verify} messages.
         * @function encodeDelimited
         * @memberof RoomPlayer
         * @static
         * @param {IRoomPlayer} message RoomPlayer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomPlayer.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a RoomPlayer message from the specified reader or buffer.
         * @function decode
         * @memberof RoomPlayer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {RoomPlayer} RoomPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomPlayer.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RoomPlayer();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.string();
                        break;
                    }
                case 2: {
                        message.roomId = reader.string();
                        break;
                    }
                case 3: {
                        message.name = reader.string();
                        break;
                    }
                case 4: {
                        message.status = reader.string();
                        break;
                    }
                case 5: {
                        message.score = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a RoomPlayer message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof RoomPlayer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {RoomPlayer} RoomPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomPlayer.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a RoomPlayer message.
         * @function verify
         * @memberof RoomPlayer
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoomPlayer.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isString(message.roomId))
                    return "roomId: string expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.status != null && message.hasOwnProperty("status"))
                if (!$util.isString(message.status))
                    return "status: string expected";
            if (message.score != null && message.hasOwnProperty("score"))
                if (!$util.isInteger(message.score))
                    return "score: integer expected";
            return null;
        };
    
        /**
         * Creates a RoomPlayer message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof RoomPlayer
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {RoomPlayer} RoomPlayer
         */
        RoomPlayer.fromObject = function fromObject(object) {
            if (object instanceof $root.RoomPlayer)
                return object;
            var message = new $root.RoomPlayer();
            if (object.id != null)
                message.id = String(object.id);
            if (object.roomId != null)
                message.roomId = String(object.roomId);
            if (object.name != null)
                message.name = String(object.name);
            if (object.status != null)
                message.status = String(object.status);
            if (object.score != null)
                message.score = object.score | 0;
            return message;
        };
    
        /**
         * Creates a plain object from a RoomPlayer message. Also converts values to other types if specified.
         * @function toObject
         * @memberof RoomPlayer
         * @static
         * @param {RoomPlayer} message RoomPlayer
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoomPlayer.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = "";
                object.roomId = "";
                object.name = "";
                object.status = "";
                object.score = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = message.status;
            if (message.score != null && message.hasOwnProperty("score"))
                object.score = message.score;
            return object;
        };
    
        /**
         * Converts this RoomPlayer to JSON.
         * @function toJSON
         * @memberof RoomPlayer
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoomPlayer.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        /**
         * Gets the default type url for RoomPlayer
         * @function getTypeUrl
         * @memberof RoomPlayer
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RoomPlayer.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/RoomPlayer";
        };
    
        return RoomPlayer;
    })();
    
    $root.Room = (function() {
    
        /**
         * Properties of a Room.
         * @exports IRoom
         * @interface IRoom
         * @property {string|null} [id] Room id
         * @property {string|null} [ownerId] Room ownerId
         * @property {string|null} [status] Room status
         * @property {number|Long|null} [time] Room time
         * @property {string|null} [gameId] Room gameId
         * @property {IRoomSettings|null} [settings] Room settings
         * @property {IRoomRequests|null} [requests] Room requests
         * @property {Array.<string>|null} [seats] Room seats
         * @property {Array.<string>|null} [onlinePlayers] Room onlinePlayers
         * @property {Object.<string,IRoomPlayer>|null} [players] Room players
         */
    
        /**
         * Constructs a new Room.
         * @exports Room
         * @classdesc Represents a Room.
         * @implements IRoom
         * @constructor
         * @param {IRoom=} [properties] Properties to set
         */
        function Room(properties) {
            this.seats = [];
            this.onlinePlayers = [];
            this.players = {};
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Room id.
         * @member {string} id
         * @memberof Room
         * @instance
         */
        Room.prototype.id = "";
    
        /**
         * Room ownerId.
         * @member {string} ownerId
         * @memberof Room
         * @instance
         */
        Room.prototype.ownerId = "";
    
        /**
         * Room status.
         * @member {string} status
         * @memberof Room
         * @instance
         */
        Room.prototype.status = "";
    
        /**
         * Room time.
         * @member {number|Long} time
         * @memberof Room
         * @instance
         */
        Room.prototype.time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * Room gameId.
         * @member {string} gameId
         * @memberof Room
         * @instance
         */
        Room.prototype.gameId = "";
    
        /**
         * Room settings.
         * @member {IRoomSettings|null|undefined} settings
         * @memberof Room
         * @instance
         */
        Room.prototype.settings = null;
    
        /**
         * Room requests.
         * @member {IRoomRequests|null|undefined} requests
         * @memberof Room
         * @instance
         */
        Room.prototype.requests = null;
    
        /**
         * Room seats.
         * @member {Array.<string>} seats
         * @memberof Room
         * @instance
         */
        Room.prototype.seats = $util.emptyArray;
    
        /**
         * Room onlinePlayers.
         * @member {Array.<string>} onlinePlayers
         * @memberof Room
         * @instance
         */
        Room.prototype.onlinePlayers = $util.emptyArray;
    
        /**
         * Room players.
         * @member {Object.<string,IRoomPlayer>} players
         * @memberof Room
         * @instance
         */
        Room.prototype.players = $util.emptyObject;
    
        /**
         * Creates a new Room instance using the specified properties.
         * @function create
         * @memberof Room
         * @static
         * @param {IRoom=} [properties] Properties to set
         * @returns {Room} Room instance
         */
        Room.create = function create(properties) {
            return new Room(properties);
        };
    
        /**
         * Encodes the specified Room message. Does not implicitly {@link Room.verify|verify} messages.
         * @function encode
         * @memberof Room
         * @static
         * @param {IRoom} message Room message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Room.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.ownerId != null && Object.hasOwnProperty.call(message, "ownerId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.ownerId);
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.status);
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.time);
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.gameId);
            if (message.settings != null && Object.hasOwnProperty.call(message, "settings"))
                $root.RoomSettings.encode(message.settings, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.requests != null && Object.hasOwnProperty.call(message, "requests"))
                $root.RoomRequests.encode(message.requests, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.seats != null && message.seats.length)
                for (var i = 0; i < message.seats.length; ++i)
                    writer.uint32(/* id 8, wireType 2 =*/66).string(message.seats[i]);
            if (message.onlinePlayers != null && message.onlinePlayers.length)
                for (var i = 0; i < message.onlinePlayers.length; ++i)
                    writer.uint32(/* id 9, wireType 2 =*/74).string(message.onlinePlayers[i]);
            if (message.players != null && Object.hasOwnProperty.call(message, "players"))
                for (var keys = Object.keys(message.players), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 10, wireType 2 =*/82).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                    $root.RoomPlayer.encode(message.players[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            return writer;
        };
    
        /**
         * Encodes the specified Room message, length delimited. Does not implicitly {@link Room.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Room
         * @static
         * @param {IRoom} message Room message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Room.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Room message from the specified reader or buffer.
         * @function decode
         * @memberof Room
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Room} Room
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Room.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Room(), key, value;
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.string();
                        break;
                    }
                case 2: {
                        message.ownerId = reader.string();
                        break;
                    }
                case 3: {
                        message.status = reader.string();
                        break;
                    }
                case 4: {
                        message.time = reader.int64();
                        break;
                    }
                case 5: {
                        message.gameId = reader.string();
                        break;
                    }
                case 6: {
                        message.settings = $root.RoomSettings.decode(reader, reader.uint32());
                        break;
                    }
                case 7: {
                        message.requests = $root.RoomRequests.decode(reader, reader.uint32());
                        break;
                    }
                case 8: {
                        if (!(message.seats && message.seats.length))
                            message.seats = [];
                        message.seats.push(reader.string());
                        break;
                    }
                case 9: {
                        if (!(message.onlinePlayers && message.onlinePlayers.length))
                            message.onlinePlayers = [];
                        message.onlinePlayers.push(reader.string());
                        break;
                    }
                case 10: {
                        if (message.players === $util.emptyObject)
                            message.players = {};
                        var end2 = reader.uint32() + reader.pos;
                        key = "";
                        value = null;
                        while (reader.pos < end2) {
                            var tag2 = reader.uint32();
                            switch (tag2 >>> 3) {
                            case 1:
                                key = reader.string();
                                break;
                            case 2:
                                value = $root.RoomPlayer.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag2 & 7);
                                break;
                            }
                        }
                        message.players[key] = value;
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a Room message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Room
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Room} Room
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Room.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a Room message.
         * @function verify
         * @memberof Room
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Room.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.ownerId != null && message.hasOwnProperty("ownerId"))
                if (!$util.isString(message.ownerId))
                    return "ownerId: string expected";
            if (message.status != null && message.hasOwnProperty("status"))
                if (!$util.isString(message.status))
                    return "status: string expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                    return "time: integer|Long expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isString(message.gameId))
                    return "gameId: string expected";
            if (message.settings != null && message.hasOwnProperty("settings")) {
                var error = $root.RoomSettings.verify(message.settings);
                if (error)
                    return "settings." + error;
            }
            if (message.requests != null && message.hasOwnProperty("requests")) {
                var error = $root.RoomRequests.verify(message.requests);
                if (error)
                    return "requests." + error;
            }
            if (message.seats != null && message.hasOwnProperty("seats")) {
                if (!Array.isArray(message.seats))
                    return "seats: array expected";
                for (var i = 0; i < message.seats.length; ++i)
                    if (!$util.isString(message.seats[i]))
                        return "seats: string[] expected";
            }
            if (message.onlinePlayers != null && message.hasOwnProperty("onlinePlayers")) {
                if (!Array.isArray(message.onlinePlayers))
                    return "onlinePlayers: array expected";
                for (var i = 0; i < message.onlinePlayers.length; ++i)
                    if (!$util.isString(message.onlinePlayers[i]))
                        return "onlinePlayers: string[] expected";
            }
            if (message.players != null && message.hasOwnProperty("players")) {
                if (!$util.isObject(message.players))
                    return "players: object expected";
                var key = Object.keys(message.players);
                for (var i = 0; i < key.length; ++i) {
                    var error = $root.RoomPlayer.verify(message.players[key[i]]);
                    if (error)
                        return "players." + error;
                }
            }
            return null;
        };
    
        /**
         * Creates a Room message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Room
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Room} Room
         */
        Room.fromObject = function fromObject(object) {
            if (object instanceof $root.Room)
                return object;
            var message = new $root.Room();
            if (object.id != null)
                message.id = String(object.id);
            if (object.ownerId != null)
                message.ownerId = String(object.ownerId);
            if (object.status != null)
                message.status = String(object.status);
            if (object.time != null)
                if ($util.Long)
                    (message.time = $util.Long.fromValue(object.time)).unsigned = false;
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber();
            if (object.gameId != null)
                message.gameId = String(object.gameId);
            if (object.settings != null) {
                if (typeof object.settings !== "object")
                    throw TypeError(".Room.settings: object expected");
                message.settings = $root.RoomSettings.fromObject(object.settings);
            }
            if (object.requests != null) {
                if (typeof object.requests !== "object")
                    throw TypeError(".Room.requests: object expected");
                message.requests = $root.RoomRequests.fromObject(object.requests);
            }
            if (object.seats) {
                if (!Array.isArray(object.seats))
                    throw TypeError(".Room.seats: array expected");
                message.seats = [];
                for (var i = 0; i < object.seats.length; ++i)
                    message.seats[i] = String(object.seats[i]);
            }
            if (object.onlinePlayers) {
                if (!Array.isArray(object.onlinePlayers))
                    throw TypeError(".Room.onlinePlayers: array expected");
                message.onlinePlayers = [];
                for (var i = 0; i < object.onlinePlayers.length; ++i)
                    message.onlinePlayers[i] = String(object.onlinePlayers[i]);
            }
            if (object.players) {
                if (typeof object.players !== "object")
                    throw TypeError(".Room.players: object expected");
                message.players = {};
                for (var keys = Object.keys(object.players), i = 0; i < keys.length; ++i) {
                    if (typeof object.players[keys[i]] !== "object")
                        throw TypeError(".Room.players: object expected");
                    message.players[keys[i]] = $root.RoomPlayer.fromObject(object.players[keys[i]]);
                }
            }
            return message;
        };
    
        /**
         * Creates a plain object from a Room message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Room
         * @static
         * @param {Room} message Room
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Room.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.seats = [];
                object.onlinePlayers = [];
            }
            if (options.objects || options.defaults)
                object.players = {};
            if (options.defaults) {
                object.id = "";
                object.ownerId = "";
                object.status = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.time = options.longs === String ? "0" : 0;
                object.gameId = "";
                object.settings = null;
                object.requests = null;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.ownerId != null && message.hasOwnProperty("ownerId"))
                object.ownerId = message.ownerId;
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = message.status;
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber() : message.time;
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.settings != null && message.hasOwnProperty("settings"))
                object.settings = $root.RoomSettings.toObject(message.settings, options);
            if (message.requests != null && message.hasOwnProperty("requests"))
                object.requests = $root.RoomRequests.toObject(message.requests, options);
            if (message.seats && message.seats.length) {
                object.seats = [];
                for (var j = 0; j < message.seats.length; ++j)
                    object.seats[j] = message.seats[j];
            }
            if (message.onlinePlayers && message.onlinePlayers.length) {
                object.onlinePlayers = [];
                for (var j = 0; j < message.onlinePlayers.length; ++j)
                    object.onlinePlayers[j] = message.onlinePlayers[j];
            }
            var keys2;
            if (message.players && (keys2 = Object.keys(message.players)).length) {
                object.players = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.players[keys2[j]] = $root.RoomPlayer.toObject(message.players[keys2[j]], options);
            }
            return object;
        };
    
        /**
         * Converts this Room to JSON.
         * @function toJSON
         * @memberof Room
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Room.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        /**
         * Gets the default type url for Room
         * @function getTypeUrl
         * @memberof Room
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Room.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Room";
        };
    
        return Room;
    })();
    
    $root.GamePlayer = (function() {
    
        /**
         * Properties of a GamePlayer.
         * @exports IGamePlayer
         * @interface IGamePlayer
         * @property {string|null} [id] GamePlayer id
         * @property {string|null} [status] GamePlayer status
         * @property {number|null} [nCard] GamePlayer nCard
         * @property {Array.<number>|null} [cards] GamePlayer cards
         */
    
        /**
         * Constructs a new GamePlayer.
         * @exports GamePlayer
         * @classdesc Represents a GamePlayer.
         * @implements IGamePlayer
         * @constructor
         * @param {IGamePlayer=} [properties] Properties to set
         */
        function GamePlayer(properties) {
            this.cards = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * GamePlayer id.
         * @member {string} id
         * @memberof GamePlayer
         * @instance
         */
        GamePlayer.prototype.id = "";
    
        /**
         * GamePlayer status.
         * @member {string} status
         * @memberof GamePlayer
         * @instance
         */
        GamePlayer.prototype.status = "";
    
        /**
         * GamePlayer nCard.
         * @member {number} nCard
         * @memberof GamePlayer
         * @instance
         */
        GamePlayer.prototype.nCard = 0;
    
        /**
         * GamePlayer cards.
         * @member {Array.<number>} cards
         * @memberof GamePlayer
         * @instance
         */
        GamePlayer.prototype.cards = $util.emptyArray;
    
        /**
         * Creates a new GamePlayer instance using the specified properties.
         * @function create
         * @memberof GamePlayer
         * @static
         * @param {IGamePlayer=} [properties] Properties to set
         * @returns {GamePlayer} GamePlayer instance
         */
        GamePlayer.create = function create(properties) {
            return new GamePlayer(properties);
        };
    
        /**
         * Encodes the specified GamePlayer message. Does not implicitly {@link GamePlayer.verify|verify} messages.
         * @function encode
         * @memberof GamePlayer
         * @static
         * @param {IGamePlayer} message GamePlayer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GamePlayer.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.status);
            if (message.nCard != null && Object.hasOwnProperty.call(message, "nCard"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.nCard);
            if (message.cards != null && message.cards.length) {
                writer.uint32(/* id 4, wireType 2 =*/34).fork();
                for (var i = 0; i < message.cards.length; ++i)
                    writer.int32(message.cards[i]);
                writer.ldelim();
            }
            return writer;
        };
    
        /**
         * Encodes the specified GamePlayer message, length delimited. Does not implicitly {@link GamePlayer.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GamePlayer
         * @static
         * @param {IGamePlayer} message GamePlayer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GamePlayer.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a GamePlayer message from the specified reader or buffer.
         * @function decode
         * @memberof GamePlayer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GamePlayer} GamePlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GamePlayer.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GamePlayer();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.string();
                        break;
                    }
                case 2: {
                        message.status = reader.string();
                        break;
                    }
                case 3: {
                        message.nCard = reader.int32();
                        break;
                    }
                case 4: {
                        if (!(message.cards && message.cards.length))
                            message.cards = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.cards.push(reader.int32());
                        } else
                            message.cards.push(reader.int32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a GamePlayer message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GamePlayer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GamePlayer} GamePlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GamePlayer.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a GamePlayer message.
         * @function verify
         * @memberof GamePlayer
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GamePlayer.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.status != null && message.hasOwnProperty("status"))
                if (!$util.isString(message.status))
                    return "status: string expected";
            if (message.nCard != null && message.hasOwnProperty("nCard"))
                if (!$util.isInteger(message.nCard))
                    return "nCard: integer expected";
            if (message.cards != null && message.hasOwnProperty("cards")) {
                if (!Array.isArray(message.cards))
                    return "cards: array expected";
                for (var i = 0; i < message.cards.length; ++i)
                    if (!$util.isInteger(message.cards[i]))
                        return "cards: integer[] expected";
            }
            return null;
        };
    
        /**
         * Creates a GamePlayer message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GamePlayer
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GamePlayer} GamePlayer
         */
        GamePlayer.fromObject = function fromObject(object) {
            if (object instanceof $root.GamePlayer)
                return object;
            var message = new $root.GamePlayer();
            if (object.id != null)
                message.id = String(object.id);
            if (object.status != null)
                message.status = String(object.status);
            if (object.nCard != null)
                message.nCard = object.nCard | 0;
            if (object.cards) {
                if (!Array.isArray(object.cards))
                    throw TypeError(".GamePlayer.cards: array expected");
                message.cards = [];
                for (var i = 0; i < object.cards.length; ++i)
                    message.cards[i] = object.cards[i] | 0;
            }
            return message;
        };
    
        /**
         * Creates a plain object from a GamePlayer message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GamePlayer
         * @static
         * @param {GamePlayer} message GamePlayer
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GamePlayer.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.cards = [];
            if (options.defaults) {
                object.id = "";
                object.status = "";
                object.nCard = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = message.status;
            if (message.nCard != null && message.hasOwnProperty("nCard"))
                object.nCard = message.nCard;
            if (message.cards && message.cards.length) {
                object.cards = [];
                for (var j = 0; j < message.cards.length; ++j)
                    object.cards[j] = message.cards[j];
            }
            return object;
        };
    
        /**
         * Converts this GamePlayer to JSON.
         * @function toJSON
         * @memberof GamePlayer
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GamePlayer.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        /**
         * Gets the default type url for GamePlayer
         * @function getTypeUrl
         * @memberof GamePlayer
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GamePlayer.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/GamePlayer";
        };
    
        return GamePlayer;
    })();
    
    $root.Card = (function() {
    
        /**
         * Properties of a Card.
         * @exports ICard
         * @interface ICard
         * @property {string|null} [code] Card code
         * @property {number|null} [dex] Card dex
         * @property {string|null} [name] Card name
         * @property {string|null} [type] Card type
         * @property {string|null} [description] Card description
         */
    
        /**
         * Constructs a new Card.
         * @exports Card
         * @classdesc Represents a Card.
         * @implements ICard
         * @constructor
         * @param {ICard=} [properties] Properties to set
         */
        function Card(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Card code.
         * @member {string} code
         * @memberof Card
         * @instance
         */
        Card.prototype.code = "";
    
        /**
         * Card dex.
         * @member {number} dex
         * @memberof Card
         * @instance
         */
        Card.prototype.dex = 0;
    
        /**
         * Card name.
         * @member {string} name
         * @memberof Card
         * @instance
         */
        Card.prototype.name = "";
    
        /**
         * Card type.
         * @member {string} type
         * @memberof Card
         * @instance
         */
        Card.prototype.type = "";
    
        /**
         * Card description.
         * @member {string} description
         * @memberof Card
         * @instance
         */
        Card.prototype.description = "";
    
        /**
         * Creates a new Card instance using the specified properties.
         * @function create
         * @memberof Card
         * @static
         * @param {ICard=} [properties] Properties to set
         * @returns {Card} Card instance
         */
        Card.create = function create(properties) {
            return new Card(properties);
        };
    
        /**
         * Encodes the specified Card message. Does not implicitly {@link Card.verify|verify} messages.
         * @function encode
         * @memberof Card
         * @static
         * @param {ICard} message Card message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Card.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.code);
            if (message.dex != null && Object.hasOwnProperty.call(message, "dex"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.dex);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.type);
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.description);
            return writer;
        };
    
        /**
         * Encodes the specified Card message, length delimited. Does not implicitly {@link Card.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Card
         * @static
         * @param {ICard} message Card message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Card.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Card message from the specified reader or buffer.
         * @function decode
         * @memberof Card
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Card} Card
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Card.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Card();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.code = reader.string();
                        break;
                    }
                case 2: {
                        message.dex = reader.int32();
                        break;
                    }
                case 3: {
                        message.name = reader.string();
                        break;
                    }
                case 4: {
                        message.type = reader.string();
                        break;
                    }
                case 5: {
                        message.description = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a Card message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Card
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Card} Card
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Card.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a Card message.
         * @function verify
         * @memberof Card
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Card.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isString(message.code))
                    return "code: string expected";
            if (message.dex != null && message.hasOwnProperty("dex"))
                if (!$util.isInteger(message.dex))
                    return "dex: integer expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isString(message.type))
                    return "type: string expected";
            if (message.description != null && message.hasOwnProperty("description"))
                if (!$util.isString(message.description))
                    return "description: string expected";
            return null;
        };
    
        /**
         * Creates a Card message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Card
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Card} Card
         */
        Card.fromObject = function fromObject(object) {
            if (object instanceof $root.Card)
                return object;
            var message = new $root.Card();
            if (object.code != null)
                message.code = String(object.code);
            if (object.dex != null)
                message.dex = object.dex | 0;
            if (object.name != null)
                message.name = String(object.name);
            if (object.type != null)
                message.type = String(object.type);
            if (object.description != null)
                message.description = String(object.description);
            return message;
        };
    
        /**
         * Creates a plain object from a Card message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Card
         * @static
         * @param {Card} message Card
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Card.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.code = "";
                object.dex = 0;
                object.name = "";
                object.type = "";
                object.description = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.dex != null && message.hasOwnProperty("dex"))
                object.dex = message.dex;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.description != null && message.hasOwnProperty("description"))
                object.description = message.description;
            return object;
        };
    
        /**
         * Converts this Card to JSON.
         * @function toJSON
         * @memberof Card
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Card.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        /**
         * Gets the default type url for Card
         * @function getTypeUrl
         * @memberof Card
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Card.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Card";
        };
    
        return Card;
    })();
    
    $root.Deck = (function() {
    
        /**
         * Properties of a Deck.
         * @exports IDeck
         * @interface IDeck
         * @property {number|null} [nCard] Deck nCard
         * @property {Array.<ICard>|null} [dex] Deck dex
         */
    
        /**
         * Constructs a new Deck.
         * @exports Deck
         * @classdesc Represents a Deck.
         * @implements IDeck
         * @constructor
         * @param {IDeck=} [properties] Properties to set
         */
        function Deck(properties) {
            this.dex = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Deck nCard.
         * @member {number} nCard
         * @memberof Deck
         * @instance
         */
        Deck.prototype.nCard = 0;
    
        /**
         * Deck dex.
         * @member {Array.<ICard>} dex
         * @memberof Deck
         * @instance
         */
        Deck.prototype.dex = $util.emptyArray;
    
        /**
         * Creates a new Deck instance using the specified properties.
         * @function create
         * @memberof Deck
         * @static
         * @param {IDeck=} [properties] Properties to set
         * @returns {Deck} Deck instance
         */
        Deck.create = function create(properties) {
            return new Deck(properties);
        };
    
        /**
         * Encodes the specified Deck message. Does not implicitly {@link Deck.verify|verify} messages.
         * @function encode
         * @memberof Deck
         * @static
         * @param {IDeck} message Deck message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Deck.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.nCard != null && Object.hasOwnProperty.call(message, "nCard"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.nCard);
            if (message.dex != null && message.dex.length)
                for (var i = 0; i < message.dex.length; ++i)
                    $root.Card.encode(message.dex[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };
    
        /**
         * Encodes the specified Deck message, length delimited. Does not implicitly {@link Deck.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Deck
         * @static
         * @param {IDeck} message Deck message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Deck.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Deck message from the specified reader or buffer.
         * @function decode
         * @memberof Deck
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Deck} Deck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Deck.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Deck();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.nCard = reader.int32();
                        break;
                    }
                case 2: {
                        if (!(message.dex && message.dex.length))
                            message.dex = [];
                        message.dex.push($root.Card.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a Deck message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Deck
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Deck} Deck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Deck.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a Deck message.
         * @function verify
         * @memberof Deck
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Deck.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.nCard != null && message.hasOwnProperty("nCard"))
                if (!$util.isInteger(message.nCard))
                    return "nCard: integer expected";
            if (message.dex != null && message.hasOwnProperty("dex")) {
                if (!Array.isArray(message.dex))
                    return "dex: array expected";
                for (var i = 0; i < message.dex.length; ++i) {
                    var error = $root.Card.verify(message.dex[i]);
                    if (error)
                        return "dex." + error;
                }
            }
            return null;
        };
    
        /**
         * Creates a Deck message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Deck
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Deck} Deck
         */
        Deck.fromObject = function fromObject(object) {
            if (object instanceof $root.Deck)
                return object;
            var message = new $root.Deck();
            if (object.nCard != null)
                message.nCard = object.nCard | 0;
            if (object.dex) {
                if (!Array.isArray(object.dex))
                    throw TypeError(".Deck.dex: array expected");
                message.dex = [];
                for (var i = 0; i < object.dex.length; ++i) {
                    if (typeof object.dex[i] !== "object")
                        throw TypeError(".Deck.dex: object expected");
                    message.dex[i] = $root.Card.fromObject(object.dex[i]);
                }
            }
            return message;
        };
    
        /**
         * Creates a plain object from a Deck message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Deck
         * @static
         * @param {Deck} message Deck
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Deck.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.dex = [];
            if (options.defaults)
                object.nCard = 0;
            if (message.nCard != null && message.hasOwnProperty("nCard"))
                object.nCard = message.nCard;
            if (message.dex && message.dex.length) {
                object.dex = [];
                for (var j = 0; j < message.dex.length; ++j)
                    object.dex[j] = $root.Card.toObject(message.dex[j], options);
            }
            return object;
        };
    
        /**
         * Converts this Deck to JSON.
         * @function toJSON
         * @memberof Deck
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Deck.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        /**
         * Gets the default type url for Deck
         * @function getTypeUrl
         * @memberof Deck
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Deck.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Deck";
        };
    
        return Deck;
    })();
    
    $root.GameEvent = (function() {
    
        /**
         * Properties of a GameEvent.
         * @exports IGameEvent
         * @interface IGameEvent
         * @property {number|null} [id] GameEvent id
         * @property {number|Long|null} [beginAt] GameEvent beginAt
         * @property {number|Long|null} [timeoutAt] GameEvent timeoutAt
         * @property {string|null} [type] GameEvent type
         * @property {string|null} [playerId] GameEvent playerId
         * @property {number|null} [card] GameEvent card
         * @property {Array.<number>|null} [cards] GameEvent cards
         * @property {string|null} [callbackName] GameEvent callbackName
         * @property {number|null} [deckCount] GameEvent deckCount
         */
    
        /**
         * Constructs a new GameEvent.
         * @exports GameEvent
         * @classdesc Represents a GameEvent.
         * @implements IGameEvent
         * @constructor
         * @param {IGameEvent=} [properties] Properties to set
         */
        function GameEvent(properties) {
            this.cards = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * GameEvent id.
         * @member {number} id
         * @memberof GameEvent
         * @instance
         */
        GameEvent.prototype.id = 0;
    
        /**
         * GameEvent beginAt.
         * @member {number|Long} beginAt
         * @memberof GameEvent
         * @instance
         */
        GameEvent.prototype.beginAt = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * GameEvent timeoutAt.
         * @member {number|Long} timeoutAt
         * @memberof GameEvent
         * @instance
         */
        GameEvent.prototype.timeoutAt = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * GameEvent type.
         * @member {string} type
         * @memberof GameEvent
         * @instance
         */
        GameEvent.prototype.type = "";
    
        /**
         * GameEvent playerId.
         * @member {string|null|undefined} playerId
         * @memberof GameEvent
         * @instance
         */
        GameEvent.prototype.playerId = null;
    
        /**
         * GameEvent card.
         * @member {number|null|undefined} card
         * @memberof GameEvent
         * @instance
         */
        GameEvent.prototype.card = null;
    
        /**
         * GameEvent cards.
         * @member {Array.<number>} cards
         * @memberof GameEvent
         * @instance
         */
        GameEvent.prototype.cards = $util.emptyArray;
    
        /**
         * GameEvent callbackName.
         * @member {string|null|undefined} callbackName
         * @memberof GameEvent
         * @instance
         */
        GameEvent.prototype.callbackName = null;
    
        /**
         * GameEvent deckCount.
         * @member {number|null|undefined} deckCount
         * @memberof GameEvent
         * @instance
         */
        GameEvent.prototype.deckCount = null;
    
        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;
    
        /**
         * GameEvent _playerId.
         * @member {"playerId"|undefined} _playerId
         * @memberof GameEvent
         * @instance
         */
        Object.defineProperty(GameEvent.prototype, "_playerId", {
            get: $util.oneOfGetter($oneOfFields = ["playerId"]),
            set: $util.oneOfSetter($oneOfFields)
        });
    
        /**
         * GameEvent _card.
         * @member {"card"|undefined} _card
         * @memberof GameEvent
         * @instance
         */
        Object.defineProperty(GameEvent.prototype, "_card", {
            get: $util.oneOfGetter($oneOfFields = ["card"]),
            set: $util.oneOfSetter($oneOfFields)
        });
    
        /**
         * GameEvent _callbackName.
         * @member {"callbackName"|undefined} _callbackName
         * @memberof GameEvent
         * @instance
         */
        Object.defineProperty(GameEvent.prototype, "_callbackName", {
            get: $util.oneOfGetter($oneOfFields = ["callbackName"]),
            set: $util.oneOfSetter($oneOfFields)
        });
    
        /**
         * GameEvent _deckCount.
         * @member {"deckCount"|undefined} _deckCount
         * @memberof GameEvent
         * @instance
         */
        Object.defineProperty(GameEvent.prototype, "_deckCount", {
            get: $util.oneOfGetter($oneOfFields = ["deckCount"]),
            set: $util.oneOfSetter($oneOfFields)
        });
    
        /**
         * Creates a new GameEvent instance using the specified properties.
         * @function create
         * @memberof GameEvent
         * @static
         * @param {IGameEvent=} [properties] Properties to set
         * @returns {GameEvent} GameEvent instance
         */
        GameEvent.create = function create(properties) {
            return new GameEvent(properties);
        };
    
        /**
         * Encodes the specified GameEvent message. Does not implicitly {@link GameEvent.verify|verify} messages.
         * @function encode
         * @memberof GameEvent
         * @static
         * @param {IGameEvent} message GameEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.beginAt != null && Object.hasOwnProperty.call(message, "beginAt"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.beginAt);
            if (message.timeoutAt != null && Object.hasOwnProperty.call(message, "timeoutAt"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.timeoutAt);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.type);
            if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.playerId);
            if (message.card != null && Object.hasOwnProperty.call(message, "card"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.card);
            if (message.cards != null && message.cards.length) {
                writer.uint32(/* id 7, wireType 2 =*/58).fork();
                for (var i = 0; i < message.cards.length; ++i)
                    writer.int32(message.cards[i]);
                writer.ldelim();
            }
            if (message.callbackName != null && Object.hasOwnProperty.call(message, "callbackName"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.callbackName);
            if (message.deckCount != null && Object.hasOwnProperty.call(message, "deckCount"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.deckCount);
            return writer;
        };
    
        /**
         * Encodes the specified GameEvent message, length delimited. Does not implicitly {@link GameEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameEvent
         * @static
         * @param {IGameEvent} message GameEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a GameEvent message from the specified reader or buffer.
         * @function decode
         * @memberof GameEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameEvent} GameEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameEvent();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.int32();
                        break;
                    }
                case 2: {
                        message.beginAt = reader.int64();
                        break;
                    }
                case 3: {
                        message.timeoutAt = reader.int64();
                        break;
                    }
                case 4: {
                        message.type = reader.string();
                        break;
                    }
                case 5: {
                        message.playerId = reader.string();
                        break;
                    }
                case 6: {
                        message.card = reader.int32();
                        break;
                    }
                case 7: {
                        if (!(message.cards && message.cards.length))
                            message.cards = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.cards.push(reader.int32());
                        } else
                            message.cards.push(reader.int32());
                        break;
                    }
                case 8: {
                        message.callbackName = reader.string();
                        break;
                    }
                case 9: {
                        message.deckCount = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a GameEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameEvent} GameEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a GameEvent message.
         * @function verify
         * @memberof GameEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.beginAt != null && message.hasOwnProperty("beginAt"))
                if (!$util.isInteger(message.beginAt) && !(message.beginAt && $util.isInteger(message.beginAt.low) && $util.isInteger(message.beginAt.high)))
                    return "beginAt: integer|Long expected";
            if (message.timeoutAt != null && message.hasOwnProperty("timeoutAt"))
                if (!$util.isInteger(message.timeoutAt) && !(message.timeoutAt && $util.isInteger(message.timeoutAt.low) && $util.isInteger(message.timeoutAt.high)))
                    return "timeoutAt: integer|Long expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isString(message.type))
                    return "type: string expected";
            if (message.playerId != null && message.hasOwnProperty("playerId")) {
                properties._playerId = 1;
                if (!$util.isString(message.playerId))
                    return "playerId: string expected";
            }
            if (message.card != null && message.hasOwnProperty("card")) {
                properties._card = 1;
                if (!$util.isInteger(message.card))
                    return "card: integer expected";
            }
            if (message.cards != null && message.hasOwnProperty("cards")) {
                if (!Array.isArray(message.cards))
                    return "cards: array expected";
                for (var i = 0; i < message.cards.length; ++i)
                    if (!$util.isInteger(message.cards[i]))
                        return "cards: integer[] expected";
            }
            if (message.callbackName != null && message.hasOwnProperty("callbackName")) {
                properties._callbackName = 1;
                if (!$util.isString(message.callbackName))
                    return "callbackName: string expected";
            }
            if (message.deckCount != null && message.hasOwnProperty("deckCount")) {
                properties._deckCount = 1;
                if (!$util.isInteger(message.deckCount))
                    return "deckCount: integer expected";
            }
            return null;
        };
    
        /**
         * Creates a GameEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameEvent} GameEvent
         */
        GameEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.GameEvent)
                return object;
            var message = new $root.GameEvent();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.beginAt != null)
                if ($util.Long)
                    (message.beginAt = $util.Long.fromValue(object.beginAt)).unsigned = false;
                else if (typeof object.beginAt === "string")
                    message.beginAt = parseInt(object.beginAt, 10);
                else if (typeof object.beginAt === "number")
                    message.beginAt = object.beginAt;
                else if (typeof object.beginAt === "object")
                    message.beginAt = new $util.LongBits(object.beginAt.low >>> 0, object.beginAt.high >>> 0).toNumber();
            if (object.timeoutAt != null)
                if ($util.Long)
                    (message.timeoutAt = $util.Long.fromValue(object.timeoutAt)).unsigned = false;
                else if (typeof object.timeoutAt === "string")
                    message.timeoutAt = parseInt(object.timeoutAt, 10);
                else if (typeof object.timeoutAt === "number")
                    message.timeoutAt = object.timeoutAt;
                else if (typeof object.timeoutAt === "object")
                    message.timeoutAt = new $util.LongBits(object.timeoutAt.low >>> 0, object.timeoutAt.high >>> 0).toNumber();
            if (object.type != null)
                message.type = String(object.type);
            if (object.playerId != null)
                message.playerId = String(object.playerId);
            if (object.card != null)
                message.card = object.card | 0;
            if (object.cards) {
                if (!Array.isArray(object.cards))
                    throw TypeError(".GameEvent.cards: array expected");
                message.cards = [];
                for (var i = 0; i < object.cards.length; ++i)
                    message.cards[i] = object.cards[i] | 0;
            }
            if (object.callbackName != null)
                message.callbackName = String(object.callbackName);
            if (object.deckCount != null)
                message.deckCount = object.deckCount | 0;
            return message;
        };
    
        /**
         * Creates a plain object from a GameEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameEvent
         * @static
         * @param {GameEvent} message GameEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.cards = [];
            if (options.defaults) {
                object.id = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.beginAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.beginAt = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timeoutAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timeoutAt = options.longs === String ? "0" : 0;
                object.type = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.beginAt != null && message.hasOwnProperty("beginAt"))
                if (typeof message.beginAt === "number")
                    object.beginAt = options.longs === String ? String(message.beginAt) : message.beginAt;
                else
                    object.beginAt = options.longs === String ? $util.Long.prototype.toString.call(message.beginAt) : options.longs === Number ? new $util.LongBits(message.beginAt.low >>> 0, message.beginAt.high >>> 0).toNumber() : message.beginAt;
            if (message.timeoutAt != null && message.hasOwnProperty("timeoutAt"))
                if (typeof message.timeoutAt === "number")
                    object.timeoutAt = options.longs === String ? String(message.timeoutAt) : message.timeoutAt;
                else
                    object.timeoutAt = options.longs === String ? $util.Long.prototype.toString.call(message.timeoutAt) : options.longs === Number ? new $util.LongBits(message.timeoutAt.low >>> 0, message.timeoutAt.high >>> 0).toNumber() : message.timeoutAt;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.playerId != null && message.hasOwnProperty("playerId")) {
                object.playerId = message.playerId;
                if (options.oneofs)
                    object._playerId = "playerId";
            }
            if (message.card != null && message.hasOwnProperty("card")) {
                object.card = message.card;
                if (options.oneofs)
                    object._card = "card";
            }
            if (message.cards && message.cards.length) {
                object.cards = [];
                for (var j = 0; j < message.cards.length; ++j)
                    object.cards[j] = message.cards[j];
            }
            if (message.callbackName != null && message.hasOwnProperty("callbackName")) {
                object.callbackName = message.callbackName;
                if (options.oneofs)
                    object._callbackName = "callbackName";
            }
            if (message.deckCount != null && message.hasOwnProperty("deckCount")) {
                object.deckCount = message.deckCount;
                if (options.oneofs)
                    object._deckCount = "deckCount";
            }
            return object;
        };
    
        /**
         * Converts this GameEvent to JSON.
         * @function toJSON
         * @memberof GameEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        /**
         * Gets the default type url for GameEvent
         * @function getTypeUrl
         * @memberof GameEvent
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GameEvent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/GameEvent";
        };
    
        return GameEvent;
    })();
    
    $root.Game = (function() {
    
        /**
         * Properties of a Game.
         * @exports IGame
         * @interface IGame
         * @property {string|null} [id] Game id
         * @property {string|null} [currentPlayerId] Game currentPlayerId
         * @property {number|null} [direction] Game direction
         * @property {IRoomSettings|null} [settings] Game settings
         * @property {IDeck|null} [deck] Game deck
         * @property {Array.<string>|null} [graveyard] Game graveyard
         * @property {Array.<IGamePlayer>|null} [players] Game players
         * @property {IGameEvent|null} [event] Game event
         * @property {number|Long|null} [time] Game time
         * @property {number|null} [turnStack] Game turnStack
         */
    
        /**
         * Constructs a new Game.
         * @exports Game
         * @classdesc Represents a Game.
         * @implements IGame
         * @constructor
         * @param {IGame=} [properties] Properties to set
         */
        function Game(properties) {
            this.graveyard = [];
            this.players = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Game id.
         * @member {string} id
         * @memberof Game
         * @instance
         */
        Game.prototype.id = "";
    
        /**
         * Game currentPlayerId.
         * @member {string} currentPlayerId
         * @memberof Game
         * @instance
         */
        Game.prototype.currentPlayerId = "";
    
        /**
         * Game direction.
         * @member {number} direction
         * @memberof Game
         * @instance
         */
        Game.prototype.direction = 0;
    
        /**
         * Game settings.
         * @member {IRoomSettings|null|undefined} settings
         * @memberof Game
         * @instance
         */
        Game.prototype.settings = null;
    
        /**
         * Game deck.
         * @member {IDeck|null|undefined} deck
         * @memberof Game
         * @instance
         */
        Game.prototype.deck = null;
    
        /**
         * Game graveyard.
         * @member {Array.<string>} graveyard
         * @memberof Game
         * @instance
         */
        Game.prototype.graveyard = $util.emptyArray;
    
        /**
         * Game players.
         * @member {Array.<IGamePlayer>} players
         * @memberof Game
         * @instance
         */
        Game.prototype.players = $util.emptyArray;
    
        /**
         * Game event.
         * @member {IGameEvent|null|undefined} event
         * @memberof Game
         * @instance
         */
        Game.prototype.event = null;
    
        /**
         * Game time.
         * @member {number|Long} time
         * @memberof Game
         * @instance
         */
        Game.prototype.time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * Game turnStack.
         * @member {number} turnStack
         * @memberof Game
         * @instance
         */
        Game.prototype.turnStack = 0;
    
        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;
    
        /**
         * Game _event.
         * @member {"event"|undefined} _event
         * @memberof Game
         * @instance
         */
        Object.defineProperty(Game.prototype, "_event", {
            get: $util.oneOfGetter($oneOfFields = ["event"]),
            set: $util.oneOfSetter($oneOfFields)
        });
    
        /**
         * Creates a new Game instance using the specified properties.
         * @function create
         * @memberof Game
         * @static
         * @param {IGame=} [properties] Properties to set
         * @returns {Game} Game instance
         */
        Game.create = function create(properties) {
            return new Game(properties);
        };
    
        /**
         * Encodes the specified Game message. Does not implicitly {@link Game.verify|verify} messages.
         * @function encode
         * @memberof Game
         * @static
         * @param {IGame} message Game message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Game.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.currentPlayerId != null && Object.hasOwnProperty.call(message, "currentPlayerId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.currentPlayerId);
            if (message.direction != null && Object.hasOwnProperty.call(message, "direction"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.direction);
            if (message.settings != null && Object.hasOwnProperty.call(message, "settings"))
                $root.RoomSettings.encode(message.settings, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.deck != null && Object.hasOwnProperty.call(message, "deck"))
                $root.Deck.encode(message.deck, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.graveyard != null && message.graveyard.length)
                for (var i = 0; i < message.graveyard.length; ++i)
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.graveyard[i]);
            if (message.players != null && message.players.length)
                for (var i = 0; i < message.players.length; ++i)
                    $root.GamePlayer.encode(message.players[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.event != null && Object.hasOwnProperty.call(message, "event"))
                $root.GameEvent.encode(message.event, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                writer.uint32(/* id 9, wireType 0 =*/72).int64(message.time);
            if (message.turnStack != null && Object.hasOwnProperty.call(message, "turnStack"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.turnStack);
            return writer;
        };
    
        /**
         * Encodes the specified Game message, length delimited. Does not implicitly {@link Game.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Game
         * @static
         * @param {IGame} message Game message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Game.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Game message from the specified reader or buffer.
         * @function decode
         * @memberof Game
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Game} Game
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Game.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Game();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.string();
                        break;
                    }
                case 2: {
                        message.currentPlayerId = reader.string();
                        break;
                    }
                case 3: {
                        message.direction = reader.int32();
                        break;
                    }
                case 4: {
                        message.settings = $root.RoomSettings.decode(reader, reader.uint32());
                        break;
                    }
                case 5: {
                        message.deck = $root.Deck.decode(reader, reader.uint32());
                        break;
                    }
                case 6: {
                        if (!(message.graveyard && message.graveyard.length))
                            message.graveyard = [];
                        message.graveyard.push(reader.string());
                        break;
                    }
                case 7: {
                        if (!(message.players && message.players.length))
                            message.players = [];
                        message.players.push($root.GamePlayer.decode(reader, reader.uint32()));
                        break;
                    }
                case 8: {
                        message.event = $root.GameEvent.decode(reader, reader.uint32());
                        break;
                    }
                case 9: {
                        message.time = reader.int64();
                        break;
                    }
                case 10: {
                        message.turnStack = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a Game message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Game
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Game} Game
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Game.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a Game message.
         * @function verify
         * @memberof Game
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Game.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.currentPlayerId != null && message.hasOwnProperty("currentPlayerId"))
                if (!$util.isString(message.currentPlayerId))
                    return "currentPlayerId: string expected";
            if (message.direction != null && message.hasOwnProperty("direction"))
                if (!$util.isInteger(message.direction))
                    return "direction: integer expected";
            if (message.settings != null && message.hasOwnProperty("settings")) {
                var error = $root.RoomSettings.verify(message.settings);
                if (error)
                    return "settings." + error;
            }
            if (message.deck != null && message.hasOwnProperty("deck")) {
                var error = $root.Deck.verify(message.deck);
                if (error)
                    return "deck." + error;
            }
            if (message.graveyard != null && message.hasOwnProperty("graveyard")) {
                if (!Array.isArray(message.graveyard))
                    return "graveyard: array expected";
                for (var i = 0; i < message.graveyard.length; ++i)
                    if (!$util.isString(message.graveyard[i]))
                        return "graveyard: string[] expected";
            }
            if (message.players != null && message.hasOwnProperty("players")) {
                if (!Array.isArray(message.players))
                    return "players: array expected";
                for (var i = 0; i < message.players.length; ++i) {
                    var error = $root.GamePlayer.verify(message.players[i]);
                    if (error)
                        return "players." + error;
                }
            }
            if (message.event != null && message.hasOwnProperty("event")) {
                properties._event = 1;
                {
                    var error = $root.GameEvent.verify(message.event);
                    if (error)
                        return "event." + error;
                }
            }
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                    return "time: integer|Long expected";
            if (message.turnStack != null && message.hasOwnProperty("turnStack"))
                if (!$util.isInteger(message.turnStack))
                    return "turnStack: integer expected";
            return null;
        };
    
        /**
         * Creates a Game message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Game
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Game} Game
         */
        Game.fromObject = function fromObject(object) {
            if (object instanceof $root.Game)
                return object;
            var message = new $root.Game();
            if (object.id != null)
                message.id = String(object.id);
            if (object.currentPlayerId != null)
                message.currentPlayerId = String(object.currentPlayerId);
            if (object.direction != null)
                message.direction = object.direction | 0;
            if (object.settings != null) {
                if (typeof object.settings !== "object")
                    throw TypeError(".Game.settings: object expected");
                message.settings = $root.RoomSettings.fromObject(object.settings);
            }
            if (object.deck != null) {
                if (typeof object.deck !== "object")
                    throw TypeError(".Game.deck: object expected");
                message.deck = $root.Deck.fromObject(object.deck);
            }
            if (object.graveyard) {
                if (!Array.isArray(object.graveyard))
                    throw TypeError(".Game.graveyard: array expected");
                message.graveyard = [];
                for (var i = 0; i < object.graveyard.length; ++i)
                    message.graveyard[i] = String(object.graveyard[i]);
            }
            if (object.players) {
                if (!Array.isArray(object.players))
                    throw TypeError(".Game.players: array expected");
                message.players = [];
                for (var i = 0; i < object.players.length; ++i) {
                    if (typeof object.players[i] !== "object")
                        throw TypeError(".Game.players: object expected");
                    message.players[i] = $root.GamePlayer.fromObject(object.players[i]);
                }
            }
            if (object.event != null) {
                if (typeof object.event !== "object")
                    throw TypeError(".Game.event: object expected");
                message.event = $root.GameEvent.fromObject(object.event);
            }
            if (object.time != null)
                if ($util.Long)
                    (message.time = $util.Long.fromValue(object.time)).unsigned = false;
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber();
            if (object.turnStack != null)
                message.turnStack = object.turnStack | 0;
            return message;
        };
    
        /**
         * Creates a plain object from a Game message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Game
         * @static
         * @param {Game} message Game
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Game.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.graveyard = [];
                object.players = [];
            }
            if (options.defaults) {
                object.id = "";
                object.currentPlayerId = "";
                object.direction = 0;
                object.settings = null;
                object.deck = null;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.time = options.longs === String ? "0" : 0;
                object.turnStack = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.currentPlayerId != null && message.hasOwnProperty("currentPlayerId"))
                object.currentPlayerId = message.currentPlayerId;
            if (message.direction != null && message.hasOwnProperty("direction"))
                object.direction = message.direction;
            if (message.settings != null && message.hasOwnProperty("settings"))
                object.settings = $root.RoomSettings.toObject(message.settings, options);
            if (message.deck != null && message.hasOwnProperty("deck"))
                object.deck = $root.Deck.toObject(message.deck, options);
            if (message.graveyard && message.graveyard.length) {
                object.graveyard = [];
                for (var j = 0; j < message.graveyard.length; ++j)
                    object.graveyard[j] = message.graveyard[j];
            }
            if (message.players && message.players.length) {
                object.players = [];
                for (var j = 0; j < message.players.length; ++j)
                    object.players[j] = $root.GamePlayer.toObject(message.players[j], options);
            }
            if (message.event != null && message.hasOwnProperty("event")) {
                object.event = $root.GameEvent.toObject(message.event, options);
                if (options.oneofs)
                    object._event = "event";
            }
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber() : message.time;
            if (message.turnStack != null && message.hasOwnProperty("turnStack"))
                object.turnStack = message.turnStack;
            return object;
        };
    
        /**
         * Converts this Game to JSON.
         * @function toJSON
         * @memberof Game
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Game.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        /**
         * Gets the default type url for Game
         * @function getTypeUrl
         * @memberof Game
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Game.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Game";
        };
    
        return Game;
    })();
    
    $root.GameLog = (function() {
    
        /**
         * Properties of a GameLog.
         * @exports IGameLog
         * @interface IGameLog
         * @property {number|null} [id] GameLog id
         * @property {string|null} [type] GameLog type
         * @property {number|Long|null} [time] GameLog time
         * @property {string|null} [playerId] GameLog playerId
         * @property {string|null} [subType] GameLog subType
         * @property {number|null} [card] GameLog card
         * @property {number|null} [index] GameLog index
         * @property {number|null} [deckCount] GameLog deckCount
         * @property {Array.<number>|null} [cards] GameLog cards
         * @property {Array.<string>|null} [playerIds] GameLog playerIds
         * @property {string|null} [message] GameLog message
         * @property {IGameEvent|null} [event] GameLog event
         * @property {number|null} [turnStack] GameLog turnStack
         */
    
        /**
         * Constructs a new GameLog.
         * @exports GameLog
         * @classdesc Represents a GameLog.
         * @implements IGameLog
         * @constructor
         * @param {IGameLog=} [properties] Properties to set
         */
        function GameLog(properties) {
            this.cards = [];
            this.playerIds = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * GameLog id.
         * @member {number} id
         * @memberof GameLog
         * @instance
         */
        GameLog.prototype.id = 0;
    
        /**
         * GameLog type.
         * @member {string} type
         * @memberof GameLog
         * @instance
         */
        GameLog.prototype.type = "";
    
        /**
         * GameLog time.
         * @member {number|Long} time
         * @memberof GameLog
         * @instance
         */
        GameLog.prototype.time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * GameLog playerId.
         * @member {string|null|undefined} playerId
         * @memberof GameLog
         * @instance
         */
        GameLog.prototype.playerId = null;
    
        /**
         * GameLog subType.
         * @member {string|null|undefined} subType
         * @memberof GameLog
         * @instance
         */
        GameLog.prototype.subType = null;
    
        /**
         * GameLog card.
         * @member {number|null|undefined} card
         * @memberof GameLog
         * @instance
         */
        GameLog.prototype.card = null;
    
        /**
         * GameLog index.
         * @member {number|null|undefined} index
         * @memberof GameLog
         * @instance
         */
        GameLog.prototype.index = null;
    
        /**
         * GameLog deckCount.
         * @member {number|null|undefined} deckCount
         * @memberof GameLog
         * @instance
         */
        GameLog.prototype.deckCount = null;
    
        /**
         * GameLog cards.
         * @member {Array.<number>} cards
         * @memberof GameLog
         * @instance
         */
        GameLog.prototype.cards = $util.emptyArray;
    
        /**
         * GameLog playerIds.
         * @member {Array.<string>} playerIds
         * @memberof GameLog
         * @instance
         */
        GameLog.prototype.playerIds = $util.emptyArray;
    
        /**
         * GameLog message.
         * @member {string|null|undefined} message
         * @memberof GameLog
         * @instance
         */
        GameLog.prototype.message = null;
    
        /**
         * GameLog event.
         * @member {IGameEvent|null|undefined} event
         * @memberof GameLog
         * @instance
         */
        GameLog.prototype.event = null;
    
        /**
         * GameLog turnStack.
         * @member {number|null|undefined} turnStack
         * @memberof GameLog
         * @instance
         */
        GameLog.prototype.turnStack = null;
    
        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;
    
        /**
         * GameLog _playerId.
         * @member {"playerId"|undefined} _playerId
         * @memberof GameLog
         * @instance
         */
        Object.defineProperty(GameLog.prototype, "_playerId", {
            get: $util.oneOfGetter($oneOfFields = ["playerId"]),
            set: $util.oneOfSetter($oneOfFields)
        });
    
        /**
         * GameLog _subType.
         * @member {"subType"|undefined} _subType
         * @memberof GameLog
         * @instance
         */
        Object.defineProperty(GameLog.prototype, "_subType", {
            get: $util.oneOfGetter($oneOfFields = ["subType"]),
            set: $util.oneOfSetter($oneOfFields)
        });
    
        /**
         * GameLog _card.
         * @member {"card"|undefined} _card
         * @memberof GameLog
         * @instance
         */
        Object.defineProperty(GameLog.prototype, "_card", {
            get: $util.oneOfGetter($oneOfFields = ["card"]),
            set: $util.oneOfSetter($oneOfFields)
        });
    
        /**
         * GameLog _index.
         * @member {"index"|undefined} _index
         * @memberof GameLog
         * @instance
         */
        Object.defineProperty(GameLog.prototype, "_index", {
            get: $util.oneOfGetter($oneOfFields = ["index"]),
            set: $util.oneOfSetter($oneOfFields)
        });
    
        /**
         * GameLog _deckCount.
         * @member {"deckCount"|undefined} _deckCount
         * @memberof GameLog
         * @instance
         */
        Object.defineProperty(GameLog.prototype, "_deckCount", {
            get: $util.oneOfGetter($oneOfFields = ["deckCount"]),
            set: $util.oneOfSetter($oneOfFields)
        });
    
        /**
         * GameLog _message.
         * @member {"message"|undefined} _message
         * @memberof GameLog
         * @instance
         */
        Object.defineProperty(GameLog.prototype, "_message", {
            get: $util.oneOfGetter($oneOfFields = ["message"]),
            set: $util.oneOfSetter($oneOfFields)
        });
    
        /**
         * GameLog _event.
         * @member {"event"|undefined} _event
         * @memberof GameLog
         * @instance
         */
        Object.defineProperty(GameLog.prototype, "_event", {
            get: $util.oneOfGetter($oneOfFields = ["event"]),
            set: $util.oneOfSetter($oneOfFields)
        });
    
        /**
         * GameLog _turnStack.
         * @member {"turnStack"|undefined} _turnStack
         * @memberof GameLog
         * @instance
         */
        Object.defineProperty(GameLog.prototype, "_turnStack", {
            get: $util.oneOfGetter($oneOfFields = ["turnStack"]),
            set: $util.oneOfSetter($oneOfFields)
        });
    
        /**
         * Creates a new GameLog instance using the specified properties.
         * @function create
         * @memberof GameLog
         * @static
         * @param {IGameLog=} [properties] Properties to set
         * @returns {GameLog} GameLog instance
         */
        GameLog.create = function create(properties) {
            return new GameLog(properties);
        };
    
        /**
         * Encodes the specified GameLog message. Does not implicitly {@link GameLog.verify|verify} messages.
         * @function encode
         * @memberof GameLog
         * @static
         * @param {IGameLog} message GameLog message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameLog.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.type);
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.time);
            if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.playerId);
            if (message.subType != null && Object.hasOwnProperty.call(message, "subType"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.subType);
            if (message.card != null && Object.hasOwnProperty.call(message, "card"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.card);
            if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.index);
            if (message.deckCount != null && Object.hasOwnProperty.call(message, "deckCount"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.deckCount);
            if (message.cards != null && message.cards.length) {
                writer.uint32(/* id 9, wireType 2 =*/74).fork();
                for (var i = 0; i < message.cards.length; ++i)
                    writer.int32(message.cards[i]);
                writer.ldelim();
            }
            if (message.playerIds != null && message.playerIds.length)
                for (var i = 0; i < message.playerIds.length; ++i)
                    writer.uint32(/* id 10, wireType 2 =*/82).string(message.playerIds[i]);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 11, wireType 2 =*/90).string(message.message);
            if (message.event != null && Object.hasOwnProperty.call(message, "event"))
                $root.GameEvent.encode(message.event, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
            if (message.turnStack != null && Object.hasOwnProperty.call(message, "turnStack"))
                writer.uint32(/* id 13, wireType 0 =*/104).int32(message.turnStack);
            return writer;
        };
    
        /**
         * Encodes the specified GameLog message, length delimited. Does not implicitly {@link GameLog.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameLog
         * @static
         * @param {IGameLog} message GameLog message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameLog.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a GameLog message from the specified reader or buffer.
         * @function decode
         * @memberof GameLog
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameLog} GameLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameLog.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameLog();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.int32();
                        break;
                    }
                case 2: {
                        message.type = reader.string();
                        break;
                    }
                case 3: {
                        message.time = reader.int64();
                        break;
                    }
                case 4: {
                        message.playerId = reader.string();
                        break;
                    }
                case 5: {
                        message.subType = reader.string();
                        break;
                    }
                case 6: {
                        message.card = reader.int32();
                        break;
                    }
                case 7: {
                        message.index = reader.int32();
                        break;
                    }
                case 8: {
                        message.deckCount = reader.int32();
                        break;
                    }
                case 9: {
                        if (!(message.cards && message.cards.length))
                            message.cards = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.cards.push(reader.int32());
                        } else
                            message.cards.push(reader.int32());
                        break;
                    }
                case 10: {
                        if (!(message.playerIds && message.playerIds.length))
                            message.playerIds = [];
                        message.playerIds.push(reader.string());
                        break;
                    }
                case 11: {
                        message.message = reader.string();
                        break;
                    }
                case 12: {
                        message.event = $root.GameEvent.decode(reader, reader.uint32());
                        break;
                    }
                case 13: {
                        message.turnStack = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a GameLog message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameLog
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameLog} GameLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameLog.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a GameLog message.
         * @function verify
         * @memberof GameLog
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameLog.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isString(message.type))
                    return "type: string expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                    return "time: integer|Long expected";
            if (message.playerId != null && message.hasOwnProperty("playerId")) {
                properties._playerId = 1;
                if (!$util.isString(message.playerId))
                    return "playerId: string expected";
            }
            if (message.subType != null && message.hasOwnProperty("subType")) {
                properties._subType = 1;
                if (!$util.isString(message.subType))
                    return "subType: string expected";
            }
            if (message.card != null && message.hasOwnProperty("card")) {
                properties._card = 1;
                if (!$util.isInteger(message.card))
                    return "card: integer expected";
            }
            if (message.index != null && message.hasOwnProperty("index")) {
                properties._index = 1;
                if (!$util.isInteger(message.index))
                    return "index: integer expected";
            }
            if (message.deckCount != null && message.hasOwnProperty("deckCount")) {
                properties._deckCount = 1;
                if (!$util.isInteger(message.deckCount))
                    return "deckCount: integer expected";
            }
            if (message.cards != null && message.hasOwnProperty("cards")) {
                if (!Array.isArray(message.cards))
                    return "cards: array expected";
                for (var i = 0; i < message.cards.length; ++i)
                    if (!$util.isInteger(message.cards[i]))
                        return "cards: integer[] expected";
            }
            if (message.playerIds != null && message.hasOwnProperty("playerIds")) {
                if (!Array.isArray(message.playerIds))
                    return "playerIds: array expected";
                for (var i = 0; i < message.playerIds.length; ++i)
                    if (!$util.isString(message.playerIds[i]))
                        return "playerIds: string[] expected";
            }
            if (message.message != null && message.hasOwnProperty("message")) {
                properties._message = 1;
                if (!$util.isString(message.message))
                    return "message: string expected";
            }
            if (message.event != null && message.hasOwnProperty("event")) {
                properties._event = 1;
                {
                    var error = $root.GameEvent.verify(message.event);
                    if (error)
                        return "event." + error;
                }
            }
            if (message.turnStack != null && message.hasOwnProperty("turnStack")) {
                properties._turnStack = 1;
                if (!$util.isInteger(message.turnStack))
                    return "turnStack: integer expected";
            }
            return null;
        };
    
        /**
         * Creates a GameLog message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameLog
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameLog} GameLog
         */
        GameLog.fromObject = function fromObject(object) {
            if (object instanceof $root.GameLog)
                return object;
            var message = new $root.GameLog();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.type != null)
                message.type = String(object.type);
            if (object.time != null)
                if ($util.Long)
                    (message.time = $util.Long.fromValue(object.time)).unsigned = false;
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber();
            if (object.playerId != null)
                message.playerId = String(object.playerId);
            if (object.subType != null)
                message.subType = String(object.subType);
            if (object.card != null)
                message.card = object.card | 0;
            if (object.index != null)
                message.index = object.index | 0;
            if (object.deckCount != null)
                message.deckCount = object.deckCount | 0;
            if (object.cards) {
                if (!Array.isArray(object.cards))
                    throw TypeError(".GameLog.cards: array expected");
                message.cards = [];
                for (var i = 0; i < object.cards.length; ++i)
                    message.cards[i] = object.cards[i] | 0;
            }
            if (object.playerIds) {
                if (!Array.isArray(object.playerIds))
                    throw TypeError(".GameLog.playerIds: array expected");
                message.playerIds = [];
                for (var i = 0; i < object.playerIds.length; ++i)
                    message.playerIds[i] = String(object.playerIds[i]);
            }
            if (object.message != null)
                message.message = String(object.message);
            if (object.event != null) {
                if (typeof object.event !== "object")
                    throw TypeError(".GameLog.event: object expected");
                message.event = $root.GameEvent.fromObject(object.event);
            }
            if (object.turnStack != null)
                message.turnStack = object.turnStack | 0;
            return message;
        };
    
        /**
         * Creates a plain object from a GameLog message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameLog
         * @static
         * @param {GameLog} message GameLog
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameLog.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.cards = [];
                object.playerIds = [];
            }
            if (options.defaults) {
                object.id = 0;
                object.type = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.time = options.longs === String ? "0" : 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber() : message.time;
            if (message.playerId != null && message.hasOwnProperty("playerId")) {
                object.playerId = message.playerId;
                if (options.oneofs)
                    object._playerId = "playerId";
            }
            if (message.subType != null && message.hasOwnProperty("subType")) {
                object.subType = message.subType;
                if (options.oneofs)
                    object._subType = "subType";
            }
            if (message.card != null && message.hasOwnProperty("card")) {
                object.card = message.card;
                if (options.oneofs)
                    object._card = "card";
            }
            if (message.index != null && message.hasOwnProperty("index")) {
                object.index = message.index;
                if (options.oneofs)
                    object._index = "index";
            }
            if (message.deckCount != null && message.hasOwnProperty("deckCount")) {
                object.deckCount = message.deckCount;
                if (options.oneofs)
                    object._deckCount = "deckCount";
            }
            if (message.cards && message.cards.length) {
                object.cards = [];
                for (var j = 0; j < message.cards.length; ++j)
                    object.cards[j] = message.cards[j];
            }
            if (message.playerIds && message.playerIds.length) {
                object.playerIds = [];
                for (var j = 0; j < message.playerIds.length; ++j)
                    object.playerIds[j] = message.playerIds[j];
            }
            if (message.message != null && message.hasOwnProperty("message")) {
                object.message = message.message;
                if (options.oneofs)
                    object._message = "message";
            }
            if (message.event != null && message.hasOwnProperty("event")) {
                object.event = $root.GameEvent.toObject(message.event, options);
                if (options.oneofs)
                    object._event = "event";
            }
            if (message.turnStack != null && message.hasOwnProperty("turnStack")) {
                object.turnStack = message.turnStack;
                if (options.oneofs)
                    object._turnStack = "turnStack";
            }
            return object;
        };
    
        /**
         * Converts this GameLog to JSON.
         * @function toJSON
         * @memberof GameLog
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameLog.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        /**
         * Gets the default type url for GameLog
         * @function getTypeUrl
         * @memberof GameLog
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GameLog.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/GameLog";
        };
    
        return GameLog;
    })();
    
    $root.GameActionsMessage = (function() {
    
        /**
         * Properties of a GameActionsMessage.
         * @exports IGameActionsMessage
         * @interface IGameActionsMessage
         * @property {number|Long|null} [time] GameActionsMessage time
         * @property {Array.<IGameLog>|null} [actions] GameActionsMessage actions
         */
    
        /**
         * Constructs a new GameActionsMessage.
         * @exports GameActionsMessage
         * @classdesc Represents a GameActionsMessage.
         * @implements IGameActionsMessage
         * @constructor
         * @param {IGameActionsMessage=} [properties] Properties to set
         */
        function GameActionsMessage(properties) {
            this.actions = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * GameActionsMessage time.
         * @member {number|Long} time
         * @memberof GameActionsMessage
         * @instance
         */
        GameActionsMessage.prototype.time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * GameActionsMessage actions.
         * @member {Array.<IGameLog>} actions
         * @memberof GameActionsMessage
         * @instance
         */
        GameActionsMessage.prototype.actions = $util.emptyArray;
    
        /**
         * Creates a new GameActionsMessage instance using the specified properties.
         * @function create
         * @memberof GameActionsMessage
         * @static
         * @param {IGameActionsMessage=} [properties] Properties to set
         * @returns {GameActionsMessage} GameActionsMessage instance
         */
        GameActionsMessage.create = function create(properties) {
            return new GameActionsMessage(properties);
        };
    
        /**
         * Encodes the specified GameActionsMessage message. Does not implicitly {@link GameActionsMessage.verify|verify} messages.
         * @function encode
         * @memberof GameActionsMessage
         * @static
         * @param {IGameActionsMessage} message GameActionsMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameActionsMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.time);
            if (message.actions != null && message.actions.length)
                for (var i = 0; i < message.actions.length; ++i)
                    $root.GameLog.encode(message.actions[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };
    
        /**
         * Encodes the specified GameActionsMessage message, length delimited. Does not implicitly {@link GameActionsMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameActionsMessage
         * @static
         * @param {IGameActionsMessage} message GameActionsMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameActionsMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a GameActionsMessage message from the specified reader or buffer.
         * @function decode
         * @memberof GameActionsMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameActionsMessage} GameActionsMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameActionsMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameActionsMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.time = reader.int64();
                        break;
                    }
                case 2: {
                        if (!(message.actions && message.actions.length))
                            message.actions = [];
                        message.actions.push($root.GameLog.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a GameActionsMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameActionsMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameActionsMessage} GameActionsMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameActionsMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a GameActionsMessage message.
         * @function verify
         * @memberof GameActionsMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameActionsMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                    return "time: integer|Long expected";
            if (message.actions != null && message.hasOwnProperty("actions")) {
                if (!Array.isArray(message.actions))
                    return "actions: array expected";
                for (var i = 0; i < message.actions.length; ++i) {
                    var error = $root.GameLog.verify(message.actions[i]);
                    if (error)
                        return "actions." + error;
                }
            }
            return null;
        };
    
        /**
         * Creates a GameActionsMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameActionsMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameActionsMessage} GameActionsMessage
         */
        GameActionsMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.GameActionsMessage)
                return object;
            var message = new $root.GameActionsMessage();
            if (object.time != null)
                if ($util.Long)
                    (message.time = $util.Long.fromValue(object.time)).unsigned = false;
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber();
            if (object.actions) {
                if (!Array.isArray(object.actions))
                    throw TypeError(".GameActionsMessage.actions: array expected");
                message.actions = [];
                for (var i = 0; i < object.actions.length; ++i) {
                    if (typeof object.actions[i] !== "object")
                        throw TypeError(".GameActionsMessage.actions: object expected");
                    message.actions[i] = $root.GameLog.fromObject(object.actions[i]);
                }
            }
            return message;
        };
    
        /**
         * Creates a plain object from a GameActionsMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameActionsMessage
         * @static
         * @param {GameActionsMessage} message GameActionsMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameActionsMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.actions = [];
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.time = options.longs === String ? "0" : 0;
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber() : message.time;
            if (message.actions && message.actions.length) {
                object.actions = [];
                for (var j = 0; j < message.actions.length; ++j)
                    object.actions[j] = $root.GameLog.toObject(message.actions[j], options);
            }
            return object;
        };
    
        /**
         * Converts this GameActionsMessage to JSON.
         * @function toJSON
         * @memberof GameActionsMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameActionsMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        /**
         * Gets the default type url for GameActionsMessage
         * @function getTypeUrl
         * @memberof GameActionsMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GameActionsMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/GameActionsMessage";
        };
    
        return GameActionsMessage;
    })();

    return $root;
});
