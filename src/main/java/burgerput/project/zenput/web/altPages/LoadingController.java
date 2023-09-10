package burgerput.project.zenput.web.altPages;

import burgerput.project.zenput.Services.loadData.alertCheck.AlertLoading;
import burgerput.project.zenput.Services.loadData.zenputLoading.FoodLoadingZenput;
import burgerput.project.zenput.Services.loadData.zenputLoading.MachineLoadingZenput;
import burgerput.project.zenput.Services.saveData.SaveData;
import burgerput.project.zenput.domain.CustomMachine;
import burgerput.project.zenput.domain.Food;
import burgerput.project.zenput.domain.Machine;
import burgerput.project.zenput.repository.foodRepository.CustomFoodRepository;
import burgerput.project.zenput.repository.machineRepository.CustomMachineRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Map;

import static burgerput.project.zenput.Const.BURGERPUTSITE;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/loading")
public class LoadingController {
    private final SaveData saveData;
    private final AlertLoading alertLoading;
    private final MachineLoadingZenput machineLoadingZenput;
    private final CustomMachineRepository customMachineRepository;
    private final FoodLoadingZenput foodLoadingZenput;
    private final CustomFoodRepository customFoodRepository;

    //ZenputPage loading 후에 달라진 값들을 Alert로 넘긴다.
    @GetMapping
    public void loading(HttpServletRequest request, HttpServletResponse response) throws IOException {

        //Start Loading Logic
        //loading zenput Page's Data first
        Map<Integer, Machine> machineInfo = machineLoadingZenput.getInfo();
        Map<Integer, Food> foodInfo = foodLoadingZenput.getInfo();

        log.info("request URL ={}", request.getRequestURL());
        log.info("loading Controller={}", LocalTime.now().toString());


        //====================loading logic================================
//        addMachine Logic=================================================
        ArrayList<Map> addMap = alertLoading.addMachine(machineInfo);
//
//        //del Machine logic
        ArrayList<Map> delMap = alertLoading.delMachine(machineInfo);
//
//        //editMachine logic=====================================
        ArrayList<Map> editMap = alertLoading.editMachine(machineInfo);
//

        //machine data를 로딩한 것으로 변경함
//      saveData.machinezenputdatasave(machineInfo);

        //====================Food logic start===========================
        ArrayList<Map> addFoodMap = alertLoading.addFood(foodInfo);
        ArrayList<Map> delFoodMap = alertLoading.delFood(foodInfo);
        ArrayList<Map> editFoodMap = alertLoading.editFood(foodInfo);

        ArrayList<Map> foodMaps = alertInfo(addFoodMap, delFoodMap, editFoodMap);


//
//=============save result To DB
//apply to DB -//only execute deleteMap(delete from customMachine and save whole machine data
        alertFoodInfoToDb(delFoodMap);
        alertMachineInfoToDb(delMap);


        saveData.machinezenputdatasave(machineInfo);
        saveData.foodZenputDataSave(foodInfo);

        response.sendRedirect(BURGERPUTSITE);
    }

    //@GetMapping("/test")
    @ResponseBody
    public void loadingTest(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Map<Integer, Machine> machineInfo = machineLoadingZenput.getInfo();
//        Map<Integer, Food> foodInfo = foodLoadingZenput.getInfo();

////        addMachine Logic=================================================
        ArrayList<Map> addMap = alertLoading.addMachine(machineInfo);

        //del Machine logic
        ArrayList<Map> delMap = alertLoading.delMachine(machineInfo);

        //editMachine logic=====================================
        ArrayList<Map> editMap = alertLoading.editMachine(machineInfo);


        //machine data를 로딩한 것으로 변경함
//        saveData.machinezenputdatasave(machineInfo);

        ArrayList<Map> maps = alertInfo(addMap, delMap, editMap);

        log.info("machine alert info list ={}", maps);


        //====================Machine logic================================
////        addMachine Logic=================================================
        ArrayList<Map> addMap = alertLoading.addMachine(machineInfo);
//
//        //del Machine logic
        ArrayList<Map> delMap = alertLoading.delMachine(machineInfo);
//
//        //editMachine logic=====================================
        ArrayList<Map> editMap = alertLoading.editMachine(machineInfo);
//
//        //apply to DB -//only execute deleteMap(delete from customMachine and save whole machine data
//        //to Machine DB
        alertMachineInfoToDb(delMap);

        //machine data를 로딩한 것으로 변경함
//      saveData.machinezenputdatasave(machineInfo);

        //====================Food logic start===========================
        ArrayList<Map> addFoodMap = alertLoading.addFood(foodInfo);
        ArrayList<Map> delFoodMap = alertLoading.delFood(foodInfo);
        ArrayList<Map> editFoodMap = alertLoading.editFood(foodInfo);

        ArrayList<Map> foodMaps = alertInfo(addFoodMap, delFoodMap, editFoodMap);

        alertFoodInfoToDb(delFoodMap);

        if (!addMap.isEmpty()) {
            saveData.machinezenputdatasave(machineInfo);
        }
        if (!addFoodMap.isEmpty()) {
            saveData.foodZenputDataSave(foodInfo);
        }


    }

    private ArrayList<Map> alertInfo(ArrayList<Map> addMap, ArrayList<Map> delMap, ArrayList<Map> editMap) {

        //addMap logic
        ArrayList<Map> result = new ArrayList<>();
        if (!addMap.isEmpty() && !addMap.get(0).get("code").equals("all")) {

            for (Map map : addMap) {
                result.add(map);
            }

        }

        //edtiMap Logic
        if (!editMap.isEmpty()) {
            for (Map map : editMap) {
                result.add(map);
            }
        }



        //delMap logic
        if (!delMap.isEmpty()) {
            for (Map map : delMap) {
                result.add(map);
            }
        }

        return result;
    }


    private void alertMachineInfoToDb(ArrayList<Map> delMap) {

        for (Map<String, String> map : delMap) {
            customMachineRepository.deleteBymineId(map.get("id"));
            log.info("deleted Machine data ={}", map);
        }


    private void alertFoodInfoToDb(ArrayList<Map> delMap) {

        for (Map<String, String> map : delMap) {
            customFoodRepository.deleteBymineId(map.get("id"));
            log.info("deleted Food data ={}", map);
        }

    }
}
