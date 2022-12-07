using AutoMapper;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using PaymentFlowAnalysis.Common.Constants;
using PaymentFlowAnalysis.Common.Utilities;
using PaymentFlowAnalysis.Core.DbConnectionFactory;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Core.Repositories.Interfaces;
using PaymentFlowAnalysis.Core.UnitOfWork;
using PaymentFlowAnalysis.Service.Models;
using PaymentFlowAnalysis.Service.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Service.Services
{
    public class BlackAccountService : IBlackAccountService
    {
        private readonly IDMZUnitOfWork _dmzUnitOfWork;
        private readonly IMapper _mapper;
        public BlackAccountService(IDMZUnitOfWork unitOfWork, IMapper mapper)
        {
            _dmzUnitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public PaginatedResult<BlackAccountPageInfoDTO> GetPaginatedResult(BlackAccountSearchModel queryModel, PaginationWithSortedQueryModel paginated)
        {
            Tuple<IEnumerable<BlackAccountPageInfo>, int> tuple = _dmzUnitOfWork.BlackAccountRepository.SearchPaginated(queryModel, paginated);
            IEnumerable<BlackAccountPageInfo> userLists = tuple.Item1;
            var totalCount = tuple.Item2;

            PaginatedResult<BlackAccountPageInfoDTO> pageResult = new PaginatedResult<BlackAccountPageInfoDTO>
            {
                PaginatedInfo = new PaginatedInfo
                {
                    Page = paginated.Page,
                    PageSize = paginated.PageSize,
                    TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                    PageCount = userLists.Count(),
                    TotalCount = totalCount
                },
                Data = _mapper.Map<List<BlackAccountPageInfo>, List<BlackAccountPageInfoDTO>>(userLists.ToList()),
            };

            return pageResult;
        }

        public MemoryStream ExportFile(BlackAccountSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            IEnumerable<BlackAccountPageInfo> result = _dmzUnitOfWork.BlackAccountRepository.Search(entity, paginated);
            var resultDTO = _mapper.Map<List<BlackAccountPageInfo>, List<BlackAccountPageInfoDTO>>(result.ToList());
            IWorkbook workbook = new XSSFWorkbook();

            ISheet sheet = workbook.CreateSheet("sheet1");
            List<string> columns = new List<string>()
            {
                "資料來源","風險類別","身分證字號","錢包幣別","錢包地址","電話號碼","電子信箱","ip位置",
                "網址","備註","資料修改時間"
            };
            IRow headerRow = sheet.CreateRow(0);
            for (var i = 0; i < columns.Count; i++)
            {
                headerRow.CreateCell(i).SetCellValue(columns[i]);
            }

            int rowIndex = 1;
            foreach (var r in resultDTO)
            {
                IRow dataRow = sheet.CreateRow(rowIndex);
                dataRow.CreateCell(0).SetCellValue(r.ExchangeTypeCodeStr);
                dataRow.CreateCell(1).SetCellValue(r.RisklevelStr);
                dataRow.CreateCell(2).SetCellValue(r.IdCardNum);
                dataRow.CreateCell(3).SetCellValue(r.CurrencyType);
                dataRow.CreateCell(4).SetCellValue(r.WalletAddress);
                dataRow.CreateCell(5).SetCellValue(r.UserPhone);
                dataRow.CreateCell(6).SetCellValue(r.UserEmail);
                dataRow.CreateCell(7).SetCellValue(r.UserIP);
                dataRow.CreateCell(8).SetCellValue(r.Url);
                dataRow.CreateCell(9).SetCellValue(r.Remark);
                dataRow.CreateCell(10).SetCellValue(r.UpdateTime.ToString());

                rowIndex++;
            }

            for (int j = 0; j < 11; j++)
            {
                sheet.AutoSizeColumn(j);
            }

            var stream = new MemoryStream();
            // processing the stream.
            workbook.Write(stream);

            return stream;
            //throw new NotImplementedException();
        }

        public BlackAccountPageInfo Get(string walletaddress)
        {
            var getBlackAccount = _dmzUnitOfWork.BlackAccountRepository.Get(walletaddress);
            var getBlackAccountPhone = _dmzUnitOfWork.BlackAccountPhoneRepository.Get(walletaddress);
            var getBlackAccountEmail = _dmzUnitOfWork.BlackAccountEmailRepository.Get(walletaddress);
            var getBlackAccountIP = _dmzUnitOfWork.BlackAccountIPRepository.Get(walletaddress);
            var blackAccount = new BlackAccountPageInfo
            {
                WalletAddress = getBlackAccount.WalletAddress,
                CurrencyType = getBlackAccount.CurrencyType,
                ExchangeTypeCode = getBlackAccount.ExchangeTypeCode,
                IdCardNum = getBlackAccount.IdCardNum,
                Risklevel = getBlackAccount.Risklevel,
                Url = getBlackAccount.Url,
                CreateTime = getBlackAccount.CreateTime,
                UpdateTime = getBlackAccount.UpdateTime,
                Remark = getBlackAccount.Remark,
                UserPhone = getBlackAccountPhone.Phone,
                UserEmail = getBlackAccountEmail.Email,
                UserIP = getBlackAccountIP.IP,
            };
            if (getBlackAccount == null)
            {
                throw new OperationalException(
                    ErrorType.INSTANCE_NOT_FOUND,
                    $"查無此帳號: {walletaddress}");
            }

            return blackAccount;
        }

        public void InsertAllData(BlackAccountInsertData blackAccountInsertData)
        {
            if (_dmzUnitOfWork.BlackAccountRepository.Get(blackAccountInsertData.WalletAddress) != null) {
                throw new OperationalException(
                    ErrorType.INSTANCE_NOT_FOUND,
                    $"錢包地址已存在");
            };

            BlackAccount blackAccount = new BlackAccount
            {
                WalletAddress = blackAccountInsertData.WalletAddress,
                CurrencyType = blackAccountInsertData.CurrencyType,
                ExchangeTypeCode = 5,
                IdCardNum = blackAccountInsertData.IdCardNum,
                Risklevel = blackAccountInsertData.Risklevel,
                Url = blackAccountInsertData.Url,
                CreateTime = DateTime.Now,
                UpdateTime = DateTime.Now,
                Remark = blackAccountInsertData.Remark,
            };

            BlackAccountEmail blackAccountEmail = new BlackAccountEmail
            {
                WalletAddress = blackAccountInsertData.WalletAddress,
                Email = blackAccountInsertData.UserEmail,
                CreateTime = DateTime.Now,
                UpdateTime = DateTime.Now,
            };

            BlackAccountIP blackAccountIP = new BlackAccountIP
            {
                WalletAddress = blackAccountInsertData.WalletAddress,
                IP = blackAccountInsertData.UserIP,
                CreateTime = DateTime.Now,
                UpdateTime = DateTime.Now,
            };

            BlackAccountPhone blackAccountPhone = new BlackAccountPhone
            {
                WalletAddress = blackAccountInsertData.WalletAddress,
                Phone = blackAccountInsertData.UserPhone,
                CreateTime = DateTime.Now,
                UpdateTime = DateTime.Now,
            };
            _dmzUnitOfWork.BeginTransaction();
            try {
                _dmzUnitOfWork.BlackAccountRepository.Insert(blackAccount, _dmzUnitOfWork);
                _dmzUnitOfWork.BlackAccountEmailRepository.Insert(blackAccountEmail, _dmzUnitOfWork);
                _dmzUnitOfWork.BlackAccountIPRepository.Insert(blackAccountIP, _dmzUnitOfWork);
                _dmzUnitOfWork.BlackAccountPhoneRepository.Insert(blackAccountPhone, _dmzUnitOfWork);
                _dmzUnitOfWork.Commit();
            }
            catch (Exception ex){
                _dmzUnitOfWork.RollBack();
                throw ex;
            }
           
        }

        public void UpdateAllData(BlackAccountInsertData blackAccountUpdateData)
        {
            if (_dmzUnitOfWork.BlackAccountRepository.Get(blackAccountUpdateData.WalletAddress) == null)
            {
                throw new OperationalException(
                    ErrorType.INSTANCE_NOT_FOUND,
                    $"查無此帳號: {blackAccountUpdateData.WalletAddress}");
            }

            BlackAccount blackAccount = new BlackAccount
            {
                WalletAddress = blackAccountUpdateData.WalletAddress,
                CurrencyType = blackAccountUpdateData.CurrencyType,
                ExchangeTypeCode = 5,
                IdCardNum = blackAccountUpdateData.IdCardNum,
                Risklevel = blackAccountUpdateData.Risklevel,
                Url = blackAccountUpdateData.Url,
                CreateTime = _dmzUnitOfWork.BlackAccountRepository.Get(blackAccountUpdateData.WalletAddress).CreateTime,
                UpdateTime = DateTime.Now,
                Remark = blackAccountUpdateData.Remark,
            };

            BlackAccountEmail blackAccountEmail = new BlackAccountEmail
            {
                WalletAddress = blackAccountUpdateData.WalletAddress,
                Email = blackAccountUpdateData.UserEmail,
                CreateTime = _dmzUnitOfWork.BlackAccountRepository.Get(blackAccountUpdateData.WalletAddress).CreateTime,
                UpdateTime = DateTime.Now,
            };

            BlackAccountIP blackAccountIP = new BlackAccountIP
            {
                WalletAddress = blackAccountUpdateData.WalletAddress,
                IP = blackAccountUpdateData.UserIP,
                CreateTime = _dmzUnitOfWork.BlackAccountRepository.Get(blackAccountUpdateData.WalletAddress).CreateTime,
                UpdateTime = DateTime.Now,
            };

            BlackAccountPhone blackAccountPhone = new BlackAccountPhone
            {
                WalletAddress = blackAccountUpdateData.WalletAddress,
                Phone = blackAccountUpdateData.UserPhone,
                CreateTime = _dmzUnitOfWork.BlackAccountRepository.Get(blackAccountUpdateData.WalletAddress).CreateTime,
                UpdateTime = DateTime.Now,
            };
            _dmzUnitOfWork.BeginTransaction();
            try
            {
                _dmzUnitOfWork.BlackAccountRepository.Update(blackAccount, _dmzUnitOfWork);
                _dmzUnitOfWork.BlackAccountEmailRepository.Update(blackAccountEmail, _dmzUnitOfWork);
                _dmzUnitOfWork.BlackAccountIPRepository.Update(blackAccountIP, _dmzUnitOfWork);
                _dmzUnitOfWork.BlackAccountPhoneRepository.Update(blackAccountPhone, _dmzUnitOfWork);
                _dmzUnitOfWork.Commit();
            }
            catch (Exception ex)
            {
                _dmzUnitOfWork.RollBack();
                throw ex;
            }
        }

        public IEnumerable<BlackAccountPhoneDTO> GetPhone(string walletAddress)
        {
            return _mapper.Map<List<BlackAccountPhone>, List<BlackAccountPhoneDTO>>(_dmzUnitOfWork.BlackAccountPhoneRepository.GetByWalletAddress(walletAddress).ToList());
        }

        public IEnumerable<BlackAccountEmailDTO> GetEmail(string walletAddress)
        {
            return _mapper.Map<List<BlackAccountEmail>, List<BlackAccountEmailDTO>>(_dmzUnitOfWork.BlackAccountEmailRepository.GetByWalletAddress(walletAddress).ToList());
        }

        public IEnumerable<BlackAccountIPDTO> GetIP(string walletAddress)
        {
            return _mapper.Map<List<BlackAccountIP>, List<BlackAccountIPDTO>>(_dmzUnitOfWork.BlackAccountIPRepository.GetByWalletAddress(walletAddress).ToList());
        }
    }
}
