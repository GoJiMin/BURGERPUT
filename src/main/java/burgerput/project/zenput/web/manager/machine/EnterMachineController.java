package burgerput.project.zenput.web.manager.machine;

import burgerput.project.zenput.Services.printData.PrintData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    @GetMapping("/back/enter/machines")
    @ResponseBody
    public ArrayList enterMachine() {

        ArrayList<Map> customMachine = printData.customMachine();

        ArrayList<Map> mgrMap = printData.mgrList();
        Map<String, ArrayList<Map>> tempMap = new LinkedHashMap<>();

        if (customMachine == null) {
            ArrayList noData = new ArrayList();
            noData.add("noData");
            tempMap.put("customMachine", noData);
        }else{
            tempMap.put("customMachine", customMachine);
        }

        tempMap.put("machineList", customMachine);
        tempMap.put("mgrList", mgrMap);

        ArrayList result = new ArrayList();
        result.add(tempMap);
        return result;
    }

}
