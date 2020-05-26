function Interface() {

    $("#info-control").click(function () {
        $("html").addClass("meta-show-info");        
        $("body").append("<div id='overlay'></div>")

        $("#overlay").click(function(){
            $("#overlay").remove();
            $("html").removeClass("meta-show-info");        
        })
    })
 }

Interface.prototype.handleToggleSimulationMode = function (handler) {
    $(document).keydown(function (e) {
        if (e.which == 66) {
            handler();
        }
    });
    $("#toggle-mode").click(function () {
        handler();
    })
}

Interface.prototype.handleResetGame = function (handler) {
    $(document).keydown(function (e) {
        if (e.which == 82) {
            handler();
        }
    });
    $("#controls .reset-game").click(function () {
        handler();
    })
}

Interface.prototype.handleResetSimulation = function (handler) {
    $(document).keydown(function (e) {
        if (e.which == 82) {
            handler();
        }
    });
    $("#controls .reset-simulation").click(function () {
        handler();
    })
}
Interface.prototype.handleRunAlgorithm = function(handler) {
    $(document).keydown(function (e) {
        if (e.which == 83) {
            handler();
        }
    });
    $("#controls .start-simulation").click(function () {
        handler();
    })
}

Interface.prototype.refreshControls = function (simulationMode) {
    $("body").removeClass("meta-show-simulation-controls");
    $("body").removeClass("meta-show-game-controls");
    if (simulationMode) {
        $("body").addClass("meta-show-simulation-controls");
    }
    else {
        $("body").addClass("meta-show-game-controls");
    }
}

Interface.prototype.addMapToSelection = function (inx, title) {
    $("#maps select").append(`<option value='${inx}'>${title}</option>`)
}

Interface.prototype.handleMapChanged = function (handler) {
    $("#maps select").change(function () {
        handler($(this).val());
    })
}

Interface.prototype.getSelectedMap = function () {
    return $("#maps select").val();
}

Interface.prototype.setSelectedMap = function(val) {
    $("#maps select").val(val);
}

Interface.prototype.getSelectedAlgorithm = function () {
    return $("#algorithms select").val();
}

Interface.prototype.setSelectedAlgorithm = function(val) {
    $("#algorithms select").val(val);
}

Interface.prototype.handleAlgorithmChanged = function(handler) {
    $("#algorithms select").change(function () {
        handler($(this).val());
    })
}

export default Interface;