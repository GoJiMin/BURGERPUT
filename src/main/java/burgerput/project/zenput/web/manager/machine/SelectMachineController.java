package burgerput.project.zenput.web.manager.machine;

import burgerput.project.zenput.Services.printData.PrintData;
import burgerput.project.zenput.Services.saveData.SaveData;
import burgerput.project.zenput.domain.CustomMachine;
import burgerput.project.zenput.domain.Machine;
import burgerput.project.zenput.repository.machineRepository.CustomMachineRepository;
import burgerput.project.zenput.repository.machineRepository.MachineRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@Slf4j
public class SelectMachineController {

    private final MachineRepository machineRepository;
    private final CustomMachineRepository customMachineRepository;

    private final PrintData printData;

//    SaveData saveData;

    @GetMapping("back/select/machines") //기기 목록 출력
    @ResponseBody
    public ArrayList<Map> showMachineList() {
        //show MachineList from the Machine DB
        //[id, JSON(MAP)] 으로 리턴
        ArrayList<Map> result = printData.zenputMachine();
        return result;
    }

    @PostMapping("back/select/machines")//선택한 기기의 값
    @ResponseBody
    public void selected(@RequestBody ArrayList<Map> param) {
        log.info("Selected Machine param ={}", param.toString());
        //임시로 다지우고 시작 -> 변경해야하는 로직
//        saveData.customMachineDataSave(param);
    }
}

