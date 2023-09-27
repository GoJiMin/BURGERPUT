package burgerput.project.zenput.web.manager.machine;

import burgerput.project.zenput.Services.loadData.zenputLoading.FoodLoadingAndEnterZenput;
import burgerput.project.zenput.Services.loadData.zenputLoading.MachineLoadingAndEnterZenput;
import burgerput.project.zenput.Services.movePage.MovePageService;
import burgerput.project.zenput.Services.printData.PrintData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

@RequiredArgsConstructor
@Slf4j
@RestController
public class EnterMachineController {

    private final PrintData printData;
    private final MachineLoadingAndEnterZenput machineLoadingAndEnterZenput;

    @GetMapping("/back/enter/machines")
    @ResponseBody
    public Map<String, ArrayList<Map>> enterMachine() {

        ArrayList<Map> customMachine = printData.customMachine();

        ArrayList<Map> mgrMap = printData.mgrList();
        Map<String, ArrayList<Map>> tempMap = new LinkedHashMap<>();

        tempMap.put("customMachine", customMachine);
        tempMap.put("mgrList", mgrMap);

        return tempMap;
    }


    @PostMapping("/back/enter/machines")
    public void submitZenputMachine(@RequestBody String param) {
        machineLoadingAndEnterZenput.sendValue(param);

    }

}
